// var db      = require('../lib/db');
//     fs      = require('fs'),
//     util    = require('util'),
//     _       = require('underscore'),
//     str     = require('string');

// var PostSchema = new db.Schema({
//         title: String,
//         image: String,
//         desc: String,
//         content: String,
//         tags: [{name: String}],
//         comments: [{body: String,
//                     email: String,
//                     reply: [{
//                         body: String,
//                         email: String
//                     }],
//                     viewable: String
//                 }],
//         created_at: { type: Date, default: Date.now },
//         updated_at: { type: Date, default: Date.now },
//         viewable: { type: Boolean, default: false }
//     }),
//     postDb = db.mongoose.model('Blog', PostSchema);

// function addPost(data, req, callback) {
//     var instance = new postDb();
//     var imageFolder = __dirname + '/../images';

//     instance.title       = data.title;
//     instance.image       = imageFolder + '/' + req.files.image.name;
//     instance.desc        = data.description;
//     instance.content     = data.content;

    // var split = data.tag.split(',');

    // _.each(split, function(item) {
    //     instance.tags.push({name: str(item).trim().s});
    // });

    // instance.save(function(err) {
    //     if (err) {
    //         callback(err);
    //     } else {
    //         fs.exists(imageFolder, function (exists) {
    //             if (!exists) {
    //                 fs.mkdir(__dirname + '/../images', 0777);
    //             }

    //             fs.readFile(req.files.image.path, function(err, data) {
    //                 if (err)
    //                     callback(err);

    //                 fs.writeFile(imageFolder + '/' + req.files.image.name, data, function() {
    //                     callback();
    //                 });
    //             });
    //         });
    //     }
    // });
// }

// function addComment(data, callback) {
//     postDb.findOne({_id: data.id}, function(err, doc) {
//         doc.comments.push({body: data.body, email: data.email, viewable: false});

//         doc.save();
//     });
// }

// function updatePost(data, callback) {

//     var update = {
//         title: data.title,
//         desc: data.desc,
//         content: data.content
//     };

//     postDb.update({_id: data.id}, update, callback);
// }

// function removePost(data, callback) {
//     postDb.remove({ _id: data.id }, function (err) {
//         if (err) return handleError(err);
//     });
// }

// function removeComment() {
//     postDb.remove({ _id: data.id }, function (err) {
//         if (err) return handleError(err);
//     });
// }

// function findAll(callback) {
//     postDb.find({}, callback);
// }

// /* update this to accept a key form recent stuff
// i.e. a key of post will fetch the 3 most recent post.
// May change name to fetchLastest */
// function lastestPost(num, callback) {
//     postDb.find({})
//           .limit(parseInt(num, 10))
//           .sort('-created_at')
//           .exec(callback);
// }

// function findOne(id, callback) {
//     postDb.findOne({_id: id}, callback);
// }

// module.exports.lastestPost = lastestPost;
// module.exports.dbPosts = postDb;
// module.exports.addPost = addPost;
// module.exports.updatePost = updatePost;
// module.exports.addComment = addComment;
// module.exports.findAll = findAll;
// module.exports.findOne = findOne;