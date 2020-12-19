const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema ({
  label: {
    type: String, 
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
},
  { timestamp: true }
)

module.exports = mongoose.model("Image", imageSchema)
