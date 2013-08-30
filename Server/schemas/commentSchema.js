var db = require('../lib/db'),
    CommentSchema = new db.Schema({
        email: String,
        comment: String,
        reply: [],
        viewable: String
    }),
    Comment = db.mongoose.model('Comment', CommentSchema);

module.exports.Comment = Comment;