require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const formData = require("express-form-data")
const bodyParser = require('body-parser');
// const cloudinary = require('cloudinary')
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

const app = express();

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("image");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }))
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(formData.parse());
app.use(cors());
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.post("/image-upload", upload, (req, res) => {
  console.log("Request file ---", req.file)
  console.log("Request ---", req.body)
  console.log("Uploads ---", upload)
  res.send('file uploaded')
})


// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// })

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
