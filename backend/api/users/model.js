const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  create_on: { type: Date, default: Date.now },
  update_on: { type: Date, default: Date.now }
})

const User = mongoose.model('User', UserSchema)
module.exports = User
