module.exports = function(db) {
  var admin = {};

  admin.posts = function(req, res) {
    db.findAll(function(err, docs) {
      res.json(docs);
    });
  };

  admin.processPost = function(req, res) {
    // db.addPost(req.body, req, function(err) {
    //   if (err) throw err;

    //   res.redirect('/posts');
    // });
    console.log(req);
  };

  admin.update = function(req, res) {
    db.findOne(req.params.id, function(err, doc) {
      res.render('pages/view', {post: doc});
    });
  };

  admin.updatePost = function(req, res) {
    db.updatePost(req.body, function(err, doc) {
      if (err) throw err;

      res.redirect('/posts');
    });
  };

  admin.viewPost = function(req, res) {
    db.findOne(req.params.id, function(err, doc) {
      res.json(doc);
    });
  };

  return admin;
};