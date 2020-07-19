import * as mongoose from 'mongoose'
import configuration from '../configuration'

const mongoUrl = configuration.MONGO_URL
const DBName = configuration.MONGO_DATABASE_NAME

export const connect = () => {
  return mongoose.connect(
    `${mongoUrl}/${DBName}`,
    {
      useNewUrlParser: true, // use the new parser because current URL string parsed is deprecated
      useUnifiedTopology: true // Set to true to opt in to using the MongoDB driver's new connection management engine.
    }
  ).catch((err) => console.log(err))
}