import * as mongoose from 'mongoose'
import configuration from '../configuration'

const mongoUrl = configuration.MONGO_URL
const DBname = configuration.MONGO_DATABASE_NAME

export const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      `${mongoUrl}/${DBname}`,
      { 
        useNewUrlParser: true, 
        useUnifiedTopology: true // Set to true to opt in to using the MongoDB driver's new connection management engine.
      }
    ).then(() => console.log('MongoDB Connected...'))
      .catch((err) => console.log(err))
  })
}