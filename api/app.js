require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
// const cloudinary = require('cloudinary')
// const multer = require('multer')
// const cookieParser = require('cookie-parser');
// const formData = require("express-form-data")
// const bodyParser = require('body-parser');

const app = express();

// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// })

// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
// }).single("image")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }))
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(formData.parse());
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// })

app.post("/image-save", (req, res) => {
  const { label, url } = req.body
  return res.status(200).send({
    label,
    url
  })
})

// app.get("/images", (req, res, next) => {
//   cloudinary.v2.api.resources(
//     { type: 'upload', max_results: 10 }, 
//     (error, result) => {
//       console.log(result, error); 
//       res.status(200).send({
//         result
//       })
//     });
//   })

// app.post("/image-upload", upload, (req, res) => {
//   if (req.file) {
//     const url = req.file.path;
//     return cloudinary.uploader.upload(url).then((result) => {
//       return res.status(200).json({
//         message: 'Your image has been uploaded successfully',
//         result,
//       })
//     }).catch(err => {
//       console.error(err)
//       res.send(500).json({
//         message: 'An error occurred',
//         err
//       })
//     })
// }})

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
