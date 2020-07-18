import * as mongoose from 'mongoose'
const { Schema } = mongoose

interface ITodo extends mongoose.Document {
  content: string
}

const todoSchema = new Schema({
  content: { type: String, default: '' }
})

// todoSchema.virtual('id').get(function () { // https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual
//   return this._id.toHexString()
// })

todoSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id
    delete ret.__v
  }
}) // https://mongoosejs.com/docs/guide.html#toObject

export default mongoose.model<ITodo>('Todo', todoSchema)
