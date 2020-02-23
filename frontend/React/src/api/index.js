const config = {
  baseUrl: process.env.REACT_APP_API_URL,
  init: { credentials: 'include' }
}

function get(params) {
  return fetch(`${config.baseUrl}/${params.a}`, {
    method: 'GET',
    ...config.init
  })
    .then(res => res.json())
    .catch(error => error)
}

function post(params) {
  const a = params.a
  const data = params.data || {}
  return fetch(`${config.baseUrl}/${a}`, {
    method: 'POST',
    ...config.init,
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(error => error)
}

function put(params) {
  const a = params.a
  const data = params.data || {}
  return fetch(`${config.baseUrl}/${a}`, {
    method: 'PUT',
    ...config.init,
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(error => error)
}

function deleteReq(params) {
  const a = params.a
  return fetch(`${config.baseUrl}/${a}`, {
    method: 'DELETE',
    ...config.init
  })
    .then(res => res.json())
    .catch(error => error)
}

export function getPublicKey() {
  return get({ a: 'publickey' })
}

export function auth() {
  return get({ a: 'users/auth' })
}

export function getHomePage() {
  return get({ a: '' })
}

export function signIn(data) {
  return post({ a: 'users/signin', data })
}

export function signUp(data) {
  return post({ a: 'users/signup', data })
}

export function signOut() {
  return post({ a: 'users/signout' })
}

export function getTodos() {
  return get({ a: 'todos' })
}

export function addTodo(data) {
  return post({ a: 'todos', data })
}

export function updateTodo(data) {
  return put({ a: 'todos', data })
}
export function deleteTodo(id) {
  return deleteReq({ a: `todos/${id}` })
}
