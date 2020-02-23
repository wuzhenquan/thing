const mongoose = require('mongoose')
const configuration = require('../configuration')

mongoose.Promise = global.Promise

const url = configuration.get('MONGO_URL')
const db = configuration.get('MONGO_DATABASE_NAME')

exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${url}/${db}`, {
      useNewUrlParser: true
    })

    const connection = mongoose.connection
    connection.on('error', reject)
    connection.once('open', resolve)
  })
}
