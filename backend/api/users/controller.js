const User = require('./model')

exports.read = async () => {
    return User.find()
}

exports.create = async ({ data = {} } = {}) => {
    return User.create(data)
}

exports.signin = async ({ data = {} } = {}) => {
    return User.findOne({ name: data.name })
}