const User = require('./model')

exports.read = async () => {
  return User.find()
}

exports.create = ({ data = {} } = {}) => {
  return User.create(data)
}

exports.signin = ({ data = {} } = {}) => {
  return User.findOne({ name: data.name })
}
