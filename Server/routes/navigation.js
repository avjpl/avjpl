var blog        = require('../models/Blog'),
    util        = require('util'),
    fs          = require('fs');

// Main nav
exports.index = function(req, res) {
    // console.log(__dirname + '../images');

    // fs.exists(__dirname + '/../images', function (exists) {
    //     if (!exists) {
    //         fs.mkdir(__dirname + '/../images', 0777, function() {
    //             console.log('craeted');
    //         });
    //     }
    // });

    // res.render('index', {title: "home"});
    // var id = '51743a74d883d2629f000001';

    // blog.findOne(id, function(err, doc) {
    //     doc.comments.push({body: 'bla bla bla bla', email: 'avjpl@aol.com'});

    //     var tags = ['one', 'two', 'three'];

    //     for ( var i = 0, len = tags.length; i < len; i++ ) {
    //         doc.tags.push({name: tags[i]});
    //         // console.log(tags[i]);
    //     }

    //     doc.save();

    //     res.json(doc);
    // });
};

exports.newPost = function(req, res) {
     res.render('pages/new');
};

// Blog
exports.posts = function(req, res) {
    blog.findAll(function(err, docs) {
        res.json(docs);
    });
};

exports.processPost = function(req, res) {
    blog.addPost(req.body, req, function(err) {
        if (err) throw err;

        res.redirect('/posts');
    });
};

exports.update = function(req, res) {
    blog.findOne(req.params.id, function(err, doc) {
        res.render('pages/view', {post: doc});
    });
};

exports.updatePost = function(req, res) {
    blog.updatePost(req.body, function(err, doc) {
        if (err) throw err;

        res.redirect('/posts');
    });
};

exports.viewPost = function(req, res) {
    blog.findOne(req.params.id, function(err, doc) {
        res.json(doc);
    });
};

exports.addComment = function(req, res) {
    blog.addComment(req.body);
};

exports.test = function(req, res) {
  res.json({test: 'hello'});
};