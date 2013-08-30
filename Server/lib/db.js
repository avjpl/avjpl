var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to database
var username    = 'user',
    password    = 'password',
    address     = 'mongodb://172.16.168.188/avjpl';

connect();

function connect() {
    var url = address;
    mongoose.connect(url);
}

function disconnect() {
    mongoose.disconnect();
}