var createError = require('http-errors');
var express = require('express');
var path = require('path');
let mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var postsRouter = require('./routes/posts')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// Mongoose connection
mongoose.connect('mongodb+srv://dev01:admin@cluster0.1qep8.mongodb.net/angular-node?retryWrites=true&w=majority', {useCreateIndex:true , useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(()=>{
    console.log("connected to the mongo database");
})
.catch((err)=>{
    console.log("Error occured in connecting the database",err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter)

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
