const schema = {
  _id: String,
  data: Object,
  updatedAt: {
    default: new Date(),
    expires: 86400, // 1 day
    type: Date
  }
}
const mongoose = require('mongoose')

class MongooseStore {
  constructor({
    collection = 'sessions',
    connection = mongoose,
    expires = 86400,
    name = 'Session'
  } = {}) {
    const updatedAt = { ...schema.updatedAt, expires }
    const { Schema } = connection
    this.session = connection.model(name, new Schema({ ...schema, updatedAt }), collection)
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
      const record = { _id: id, data, updatedAt: new Date() }
      await session.findByIdAndUpdate(id, record, { upsert: true, safe: true })
    }
    return data
  }

  // ？？？ this codes in doubt, 'new' has be execute in app.index.js
  // static create(opts) {
  //     return new MongooseStore(opts);
  // }
}

module.exports = MongooseStore
