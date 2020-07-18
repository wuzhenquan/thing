import User from './model'

interface IUser {
  name: string
  password: string
  email: string
}

interface IUserFind {
  name: IUser['name']
  password?: IUser['password']
  email?: IUser['email']
}

export const create = (data: IUser) => {
  return User.create(data)
}

export const read = (data?: IUserFind) => {
  return User.find(data)
}

export const signin = (data: IUserFind) => {
  return User.findOne({ name: data.name })
}
