var mongo     = require("mongoskin"),
    _         = require("underscore")._,
    fs        = require('fs'),
    str       = require('string'),
    _app      = {};

var Congo = function(app){
  var congo = {};

  //assume localhost
  var connect = function(dbName,next){
    var db = mongo.db("localhost/" + dbName, {safe : true});
    next(db);
  };

  app.get("/mongo-api/:db/:collection",function(req,res){
    var dbName = req.params.db;
    var collName = req.params.collection;
    var out = [];
    connect(dbName, function(db){
      db.collection(collName).find().limit(50).toArray(function(err,items){
        _.each(items,function(item){
          var formatted = item;
        });

        res.json(items);
      });
    });
  });

  app.get("/mongo-api/:db/:collection/:id",function(req,res){
    var dbName = req.params.db;
    var id = req.params.id;
    var collName = req.params.collection;
    connect(dbName, function(db){
      db.collection(collName).findById(id,function(err,doc){
        res.json(doc);
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

  app.delete("/mongo-api/:db/:collection/:id",function(req,res){
    var dbName = req.params.db;
    connect(dbName, function(db){
      db.collection(req.params.collection).removeById(req.params.id,function(err,result){
        res.json(result);
      });
    });
  });

  app.put("/mongo-api/:db/:collection/:id",function(req,res){
    var dbName = req.params.db;
    connect(dbName, function(db){
      var doc = req.body;
      delete doc._id;
      db.collection(req.params.collection).updateById(req.params.id, doc, {}, function(err,result){
        var out = {error : err, result : result};
        res.json(out);
      });
    });
  });

  app.post("/mongo-api/new/post", function(req,res) {
    var data = {},
        split,
        serverAddr = 'http://avjpl-dev-server:3000',
        imageFolder = __dirname + '/../public/images';

    data.title        = req.body;
    data.image        = serverAddr + '/images/' + req.files.blog_img.name;
    data.description  = req.body.description;
    data.content      = req.body.content;
    data.tags         = req.body.tags || '';

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

    fs.exists(imageFolder, function (exists) {
      if (!exists) {
        fs.mkdir(imageFolder, 0777, function(err) {
          if(err)
            console.log('error');
        });
      }

      fs.readFile(req.files.blog_img.path, function(err, data) {
        if (err)
          console.log('error');
            // callback(err);

        fs.writeFile(imageFolder + '/' + req.files.blog_img.name, data, function() {
            // callback();
            console.log('success');
        });
      });
    });

    connect('avjpl', function(db){
      db.collection('blog').insert(data, function(err,result){
        var out = {error : err, result : result};
        console.log(out);
        // return to blog post form
        res.json(out);
        return out;
      });
    });
  });

  congo.app = app;
  return congo;
};

module.exports = Congo;