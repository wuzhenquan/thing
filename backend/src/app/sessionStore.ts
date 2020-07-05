
import * as mongoose from 'mongoose'
import { Document, Model, Schema } from 'mongoose'


// Types and references



interface ISession extends mongoose.Document {
  _id: string
  data: any
}

class MongooseStore {
  session: any;
  constructor({
    collection = 'sessions',
    name = 'Session'
  } = {}) {

    const sessionSchema: Schema = new mongoose.Schema({
      _id: String,
      data: Object,
    })

    this.session = mongoose.model<ISession>(name, sessionSchema, collection)
  }

  async destroy(id) {
    const { session } = this
    return session.remove({ _id: id })
  }

  async get(id) {
    const { session } = this
    const { data } = (await session.findById(id)) || {}
    return data
  }

  async set(id, data, maxAge, { changed, rolling }) {
    if (changed || rolling) {
      const { session } = this
      const record = { _id: id, data }
      await session.findByIdAndUpdate(id, record, { upsert: true, safe: true })
    }
    return data
  }
}

export default MongooseStore