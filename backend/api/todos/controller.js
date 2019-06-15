const todo = require('./model')

exports.read = () => {
    return todo.find()
}

exports.create = (data = {}) => {
    return todo.create(data)
}
