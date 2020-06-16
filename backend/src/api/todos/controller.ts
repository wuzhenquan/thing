import todo from './model'

export const read = () => {
  // learn from https://stackoverflow.com/questions/5825520/in-mongoose-how-do-i-sort-by-date-node-js
  return todo.find().sort({ update_on: 'descending' })
}

export const create = (data = {}) => {
  return todo.create(data)
}

export const updateOne = (filter, doc) => {
  return todo.updateOne(filter, doc)
}

export const deleteOne = id => {
  return todo.deleteOne({ _id: id })
}
