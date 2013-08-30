/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes/navigation'),
    namespace = require('express-namespace'),
    http = require('http'),
    path = require('path');

var allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://avjpl-dev');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POET,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
};

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/test', routes.test);
app.get('/blog', routes.posts);
app.get('/blog/post/:id', routes.viewPost);
app.get('/pages/newPost', routes.newPost);
app.get('/update/:id', routes.update);

// Process user request actions
app.post('/processPost', routes.processPost);
app.post('/updatePost', routes.updatePost);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
