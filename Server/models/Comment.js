var db = require('../lib/db');

var CommentSchema = new db.Schema({
        email: String,
        comment: String,
        reply: [],
        viewable: String
    }),
    Comments = db.mongoose.model('Comment', CommentSchema);

// function addComment(id, email, comment) {
//     postDb.findOne({_id: id}, function(err, doc) {
//         res.json(doc);
        // var instance = new Comments();

        // instance.email    = email || 'email default';
        // instance.comment  = comment || 'comment default';

        // doc.comments.push(instance);
        // doc.save(function(err) {
        //     console.log('Done!');
        // });
//     });
// }

// function addReply() {
    // get post id
    // get comment id
    // add reply
    // save post
// }

module.exports.commentSchema = CommentSchema;
// module.exports.addComment = addComment;