const Image = require('../models/image.model')

exports.upload = (req, res) => {
  const image = new Image({
    label: req.body.label,
    url: req.body.url
  })

  console.log('image', image.label)

  image.save((err, image) => {
    if (err) {
      return res.status(500).send({ message: 'Error', err })
    }

  res.status(200).send({ message: 'Upload successful', image})
  
  })
}