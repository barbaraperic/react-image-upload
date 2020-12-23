const { responsiveFontSizes } = require('@material-ui/core')
const Image = require('../models/image.model')

exports.upload = (req, res) => {
  const image = new Image({
    label: req.body.label,
    url: req.body.url
  })

  image.save((err, image) => {
    if (err) {
      return res.status(500).send({ message: 'Error', err })
    }

  res.status(200).send({ message: 'Upload successful', image})
  
  })
}

exports.getImages = (req, res) => {
    Image.find({}).then( images => {
    res.send(images)
  })
}

exports.deleteImage = (req, res) => {
  const id = req.body.data
  Image.deleteOne({ _id: id}, (err) => {
    if (err)
      throw err;
    else 
      res.send({ message: 'is deleted'});
  })
}

exports.getImageWithLabel = (req, res) => {
  Image.find({ label: req.body.label})
    .then(image => res.send(image))
    .catch(err => res.send(err))
}