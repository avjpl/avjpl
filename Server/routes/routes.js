var blog  = require('../models/Blog'),
    util  = require('util'),
    fs    = require('fs');

app.namespace('/blog', function() {
  app.newPost = function(req, res) {
    res.render('pages/new'); // deal with this in angular then delete
  };

  app.posts = function(req, res) {
    blog.findAll(function(err, docs) {
      res.json(docs);
    });
  };

  app.processPost = function(req, res) {
    blog.addPost(req.body, req, function(err) {
      if (err) throw err;

      res.redirect('/posts');
    });
  };

  app.update = function(req, res) {
    blog.findOne(req.params.id, function(err, doc) {
      res.render('pages/view', {post: doc}); // creat a form in angular then delete
    });
  };

  app.updatePost = function(req, res) {
    blog.updatePost(req.body, function(err, doc) {
      if (err) throw err;

      res.redirect('/posts');
    });
  };

  app.viewPost = function(req, res) {
    blog.findOne(req.params.id, function(err, doc) {
      res.json(doc);
    });
  };

  app.addComment = function(req, res) {
    blog.addComment(req.body);
  };
});