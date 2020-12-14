require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const formData = require("express-form-data")
const cloudinary = require('cloudinary')

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(formData.parse());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/image-upload', (req, res) => {
  console.log(req.files)
  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path) )
  
  Promise
    .all(promises)
    .then(res => res.json(res))
})
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
