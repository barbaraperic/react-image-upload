const controller = require('../controllers/image.controller')

module.exports = function(app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })

  app.post('image-upload', controller.upload)
}