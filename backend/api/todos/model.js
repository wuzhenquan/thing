const mongoose = require("mongoose")
const { Schema } = mongoose

const todoSchema = new Schema({
  content: { type: String, required: true },
  create_on: { type: Date, default: Date.now },
  update_on: { type: Date, default: Date.now }
})

const todo = mongoose.model('Todo', todoSchema)
module.exports = todo
