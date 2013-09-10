module.exports = function(db) {
  var blog = {};

  blog.posts = function(req, res) {
    db.findAll(function(err, docs) {
      res.json(docs);
    });
  };

  blog.viewPost = function(req, res) {
    db.findOne(req.params.id, function(err, doc) {
      res.json(doc);
    });
  };

  blog.addComment = function(req, res) {
    db.addComment(req.body);
  };

  return blog;
};