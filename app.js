var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var articleRouter = require('./routes/article');

var clientRouter = require('./routes/client');
var commandeRouter = require('./routes/commande');
var adresseRouter = require('./routes/adresse');

var app = express();

var cors = require('cors')
// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/commande', commandeRouter);

app.use('/client', clientRouter);
app.use('/adresse', adresseRouter);



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

app.use(function(req, res, next){
    res.status(404).render('404 not founds');
});

var listener = app.listen(5000, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
module.exports = app;
