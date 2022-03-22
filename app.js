var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// visited urls should check cookie
var visited = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch arbitrary urls with unique id
app.get('/urls/:id', function(req, res) {
    var urlId = req.params.id;
    console.log('Cookies: ', req.cookies);

    // first visit of url
    if (visited.indexOf(urlId) < 0) {
        visited.push(urlId);
        // respond with a unique cookie
        res.cookie(urlId, 'true', {expire: 360000 + Date.now()});
        res.send({"success": true});
    }
    else {  // url has been visited
        if (req.cookies[urlId] && req.cookies[urlId] === 'true') {
            res.send({"success": true});
        } else {
            res.statusMessage = "You do not have access to this URL";
            res.status(400).end();
        }
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
