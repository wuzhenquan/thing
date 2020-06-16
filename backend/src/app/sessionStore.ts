
import * as mongoose from 'mongoose'
import { Document, Model } from 'mongoose'
var Schema = mongoose.Schema;


const schema = {
  _id: String,
  data: Object
}

interface ISession extends Document {
  _id: string;
  data: any;
}

class MongooseStore {
  session: Model<ISession>

  constructor({
    collection = 'sessions',
    name = 'Session'
  } = {}) {
    this.session = mongoose.model(name, new Schema<ISession>({ ...schema }), collection)
  }

  async destroy(id) {
    const { session } = this
    return this.session.remove({ _id: id })
  }

  async get(id) {
    const { session } = this
    const { data } = (await session.findById(id)) || {}
    return data
  }

  async set(id, data, maxAge, { changed, rolling }) {
    if (changed || rolling) {
      const { session } = this
      const record = {
        _id: id,
        data
      }
      await session.findByIdAndUpdate(id, record, { upsert: true })
    }
    return data
  }
}

module.exports = MongooseStore
