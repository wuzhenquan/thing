const User = require('./model')

exports.read = async (data = {}) => {
  return User.find(data)
}

exports.create = ({ data = {} } = {}) => {
  return User.create(data)
}

exports.signin = ({ data = {} } = {}) => {
  return User.findOne({ name: data.name })
}
