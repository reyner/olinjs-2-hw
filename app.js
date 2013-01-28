
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , Cat = require('./models/cat')
  , cats = require('./routes/cats')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', cats.list);
app.get('/cats', cats.list);
app.get('/cats/new', cats.new);
app.get('/cats/color/:color', cats.color)
app.get('/cats/delete/old', cats.delete)
app.get('/cats/delete/all', cats.delete_all)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
