/**
 * Module dependencies.
 */

var express   = require('express'),
    http      = require('http'),
    path      = require('path');

var allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://avjpl-dev');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POET,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
};

var app = express(), mongo;

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

mongo = require("./lib/mongo")(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});