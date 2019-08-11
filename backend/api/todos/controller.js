const todo = require('./model')

exports.read = () => {
    // learn from https://stackoverflow.com/questions/5825520/in-mongoose-how-do-i-sort-by-date-node-js
    return todo.find().sort({update_on: 'descending'})
}

exports.create = (data = {}) => {
    return todo.create(data)
}

exports.updateOne = (filter, doc) => {
    return todo.updateOne(filter, doc)
}

exports.deleteOne = id =>{
    return todo.deleteOne({_id: id})
}