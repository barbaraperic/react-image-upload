const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const connect = require('./utils/db')
const dbConfig = require('./config/db.config')
const controller = require('./controllers/image.controller')
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  next()
})

app.post('/image-upload', controller.upload)

app.get('/images', controller.getImages)

app.delete('/image-delete', controller.deleteImage)

app.get('/image-label', controller.getImageWithLabel)

// catch 404 and forward to error handler

connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => app.listen(5000, () => {
    console.log('server on http://localhost:5000')
  }))
  .catch(e => console.error(e))


module.exports = app;
