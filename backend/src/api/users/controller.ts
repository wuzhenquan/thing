import User from './model'

exports.read = async (data = {}) => {
  return User.find(data)
}

exports.create = ({ data = {} } = {}) => {
  return User.create(data)
}

exports.signin = (data: { name: string }) => {
  return User.findOne({ name: data.name })
}
