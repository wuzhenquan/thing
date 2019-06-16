const mongoose = require("mongoose")
const { Schema } = mongoose

const todoSchema = new Schema({
  content: { type: String, default: '' },
  create_on: { type: Date, default: Date.now },
  update_on: { type: Date, default: Date.now }
})

// todoSchema.virtual('id').get(function () { // https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual
//   return this._id.toHexString()
// })

todoSchema.set('toObject', { virtuals: true }) // https://mongoosejs.com/docs/guide.html#toObject

const todo = mongoose.model('Todo', todoSchema)
module.exports = todo
