require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const formData = require("express-form-data")
const cloudinary = require('cloudinary')
const multer = require('multer')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(formData.parse());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// })

const upload = multer({
  dest: path.join(__dirname, 'public/images'),
});
 
app.post('/image-upload', upload.single('avatar'), (req, res, next) => {
    return res.status(201).json({
      message: 'File uploaded successfully',
      data: req.files.avatar
    })
})

  // cloudinary.uploader.upload(data.image)
  //   .then(res => {
  //     res.status(200).send({ 
  //       message: "successful upload",
  //       res
  //     }).catch(err => {
  //       res.status(500).send({
  //         message: "Error", 
  //         err
  //       })
  //     })
  //   })


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
