import Todo from './model'

interface ITodo {
  content: string
}

export const create = (data: ITodo) => {
  return Todo.create(data)
}

export const read = () => {
  // learn from https://stackoverflow.com/questions/5825520/in-mongoose-how-do-i-sort-by-date-node-js
  return Todo.find().sort({ update_on: 'descending' })
}

export const updateOne = (filter, doc) => {
  return Todo.updateOne(filter, doc)
}

export const deleteOne = id => {
  return Todo.deleteOne({ _id: id })
}
