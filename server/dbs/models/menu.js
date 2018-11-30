const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MenuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  child: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Menu', MenuSchema)

