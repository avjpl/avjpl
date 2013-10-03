var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db = null;

mongoose.connect('mongodb://localhost/avjpl');

db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connected');
});

// module.exports.mongoose = mongoose;
// module.exports.Schema = Schema;