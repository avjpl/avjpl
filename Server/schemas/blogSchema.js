var conn = require('../lib/conn');

module.exports = function() {

    var PostSchema = new conn.Schema({
            title: String,
            image: String,
            desc: String,
            content: String,
            tags: [{name: String}],
            comments: [{body: String,
                        email: String,
                        reply: [{
                            body: String,
                            email: String
                        }],
                        viewable: String
                    }],
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now },
            viewable: { type: Boolean, default: false }
        });

    return conn.mongoose.model('Blog', PostSchema);
};