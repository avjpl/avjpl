var mongo     = require("mongoskin"),
    _         = require("underscore")._,
    fs        = require('fs'),
    str       = require('string'),
    _app      = {};

var Congo = function(app) {
  var congo = {};
  var NUMBER_OF_PAGES = 2;

  // assume localhost
  var connect = function(dbName, next) {
    var db = mongo.db("localhost/" + dbName, {safe : true});
    next(db);
  };

  // map reduce
  var categoryMap = function() {
    emit(this.category, 1);
  };

  var categoryReduce = function(k, v) {
    var value = 0;

    for (var i = 0, len = v.length; i < len; i++) {
      value += v[i];
    }

    return value;
  };

  var uploadImage = function(req) {
    var imageFolder = __dirname + '/../public/images';

    fs.exists(imageFolder, function (exists) {
      if (!exists) {
        fs.mkdir(imageFolder, 0777, function(err) {
          if(err) {
            console.log('error');
          }
        });
      }

      fs.readFile(req.files.blog_img.path, function(err, data) {
        if (err) {
          console.log('error');
          // callback(err);
        }

        fs.writeFile(imageFolder + '/' + req.files.blog_img.name, data, function() {
          // callback();
          console.log('success');
        });
      });
    });
  };

  var paging = function(req) {
    var min_page, max_page;

    var pageNo = parseInt(req.params.pageNo, 10) ? parseInt(req.params.pageNo, 10) : 1;

    console.log('Page number: ' + pageNo);

    min_page = NUMBER_OF_PAGES * (pageNo - 1);
    max_page = min_page + NUMBER_OF_PAGES;

    return {
      pageNo: pageNo,
      min: min_page,
      max: max_page
    };
  };

  var insertDocument = function(db, targetCollection, data) {
    db.collection(targetCollection).indexInformation(function(err, info) {
      if (err) {
        console.log('indexInformation error');
      }

      if (!info['_idx']) {
        db.collection(targetCollection).ensureIndex([['_idx', 1]], function(err, replies) {
          if (err) {
            console.log(err);
          }
        });

//        db.collection(targetCollection).dropIndex([['_idx', 1]], function(err, info) {
//          if (err)
//            console.log(err);
//
//          console.log(info);
//        });
      }
    });

    var options = {
      'limit': 1,
      'sort': [['_idx', -1]]
    };

    var seq = 0;

    db.collection(targetCollection).find({}, {_idx: 1}, options, function(err, docs) {
      if (err) {
        console.log(err);
      }

      docs.nextObject(function(err, doc) {
        // increment _idx by 1
        seq = (doc && doc._idx) !== null ? doc._idx + 1 : 1;

        data._idx = seq;

        db.collection(targetCollection).insert(data, function(err, result) {
          var out = {error : err, result : result};

//          return out;
        });
      });
    });
  };

  var categoryOptions = {out: 'categories'};

  app.get("/mongo-api/categories", function(req, res) {
    connect('avjpl', function(db) {
      db.collection('blog').mapReduce(categoryMap, categoryReduce, categoryOptions, function(err, collection) {
        collection.find(function(err, cursor) {
          cursor.toArray(function(err, results) {
            var data = [];

            for(var i = 0, len = results.length; i < len; i++) {
              data.push(results[i]._id);
            }

            res.json(data);
          });
        });
      });
    });
  });

  // get latest
  /**
   * TODO: This won't yet due to created_at dosen't exist in any documents
   */
  app.get("/mongo-api/:db/:collection/:limit/latest", function(req, res) {
    var limit = parseInt(req.params.limit, 10);
    var dbName = req.params.db;
    var collName = req.params.collection;

    connect(dbName, function(db) {
      db.collection(collName).find().limit(limit).sort('-created_at').toArray(function(err, items) {
        res.json(items);
      });
    });
  });

  app.get("/mongo-api/:db/:collection/count", function(req, res) {
    var dbName = req.params.db;
    var collName = req.params.collection;

    connect(dbName, function(db) {
      db.collection(collName).find().toArray(function(err, items) {
        pages = Math.ceil(items.length / NUMBER_OF_PAGES);
        res.json({totalPages: pages});
      });
    });
  });

  app.get("/mongo-api/:db/:collection/view/:id*", function(req, res) {
    var dbName = req.params.db;
    var id = req.params.id;
    var collName = req.params.collection;

    connect(dbName, function(db) {
      db.collection(collName).findById(id, function(err, doc) {
        if (err) {
          console.log(err);
        }

        res.json(doc);
      });
    });
  });

  app.get("/mongo-api/:db/:collection/:pageNo?", function(req, res) {
    var dbName = req.params.db;
    var collName = req.params.collection;

    var range = paging(req);

    console.log(range);

    connect(dbName, function(db) {
      db.collection(collName).find().toArray(function(err, items) {
        /**
         * TODO: Find a native solution instead of slice usage
         */
        res.json(items.slice(range.min, range.max));
      });
    });
  });

  // app.post("/mongo-api/:db/:collection",function(req,res){
  //   var dbName = req.params.db;
  //   connect(dbName, function(db){
  //     var doc = req.body;
  //     db.collection(req.params.collection).insert(doc, function(err,result){
  //       var out = {error : err, result : result};
  //       res.json(out);
  //       return out;
  //     });
  //   });
  // });

  /**
   * TODO: look into re-indexing
   */
  app.delete("/mongo-api/:db/:collection/:id", function(req, res) {
    var dbName = req.params.db;

    connect(dbName, function(db) {
      db.collection(req.params.collection).removeById(req.params.id, function(err, result) {
        res.json(result);
      });
    });
  });

  app.put("/mongo-api/:db/:collection/:id", function(req,res) {
    var dbName = req.params.db;

    connect(dbName, function(db) {
      var doc = req.body;
      delete doc._id;

      db.collection(req.params.collection).updateById(req.params.id, doc, {}, function(err,result) {
        var out = {
            error: err,
            result: result
        };

        // uploadImage(req);

        // redirect to listings
        res.json(out);
      });
    });
  });

  app.post("/mongo-api/new/post", function(req, res) {
    var data = {},
        split,
        serverAddr = 'http://avjpl-dev-server:3000';

    data.title        = req.body.title;
    data.image        = serverAddr + '/images/' + req.files.blog_img.name;
    data.description  = req.body.description;
    data.content      = req.body.content;
    data.tags         = req.body.tags || '';
    data.category     = req.body.category || '';
    date.create_at    = new Date();

    split = data.tags.split(' ');

    var bool = split.length ? split[0].length ? true: false : false;

    if (bool) {
      var temp = [];
      _.each(split, function(item) {
          temp.push({name: str(item).trim().s});
      });

      data.tags = temp;
      temp = [];
    } else {
      data.tags = [];
    }

    uploadImage(req);
//    fs.exists(imageFolder, function (exists) {
//      if (!exists) {
//        fs.mkdir(imageFolder, 0777, function(err) {
//          if(err)
//            console.log('error');
//        });
//      }
//
//      fs.readFile(req.files.blog_img.path, function(err, data) {
//        if (err)
//          console.log('error');
//            // callback(err);
//
//        fs.writeFile(imageFolder + '/' + req.files.blog_img.name, data, function() {
//            // callback();
//            console.log('success');
//        });
//      });
//    });

    connect('avjpl', function(db) {
//      db.collection('blog').insert(data, function(err,result){
//        var out = {error : err, result : result};
//        // return to blog post form
//        res.json(out);
//        return out;
//      });
      insertDocument(db, 'blog', data);
    });
  });

  congo.app = app;
  return congo;
};

module.exports = Congo;