var db = require('../lib/db');

var PostSchema = new db.Schema({
    title: String,
    image: String,
    desc: String,
    content: String,
    tags: [],
    comments: [],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    viewable: { type: Boolean, default: false }
});

var Post = db.mongoose.model('Blog', PostSchema);

// module.exports.post = Post;