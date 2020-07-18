import * as mongoose from 'mongoose'

const { Schema } = mongoose

interface IUser extends mongoose.Document {
  name: string
  password: string
  email: string
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  create_on: { type: Date, default: Date.now },
  update_on: { type: Date, default: Date.now }
})

export default mongoose.model<IUser>('User', UserSchema)
