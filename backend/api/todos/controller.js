const todo = require('./model')

exports.read = () => {
    return todo.find()
}

exports.create = (data = {}) => {
    return todo.create(data)
}

exports.updateOne = (filter, doc) => {
    return todo.updateOne(filter, doc)
}