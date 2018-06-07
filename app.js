var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var nodemailer = require("nodemailer");
var email = require('mailer');
var http = require("http");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var winston=require('winston');
var User=require('./models/data');
var cors=require('cors');
var app = express();

//Db connection
var tt=mongoose.connect('mongodb://Keerthi:keerthi@ds133166.mlab.com:33166/teacher',function(err,success){

  if(err)
  console.log("error")
  else {
    console.log("connected")
  }
});
var db= mongoose.connection;
console.log("working...")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
