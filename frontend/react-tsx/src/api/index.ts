
// interface RequestInit {
//   body?: any;
//   cache?: RequestCache;
//   credentials?: RequestCredentials;
//   headers?: HeadersInit;
//   integrity?: string;
//   keepalive?: boolean;
//   method?: string;
//   mode?: RequestMode;
//   redirect?: RequestRedirect;
//   referrer?: string;
//   referrerPolicy?: ReferrerPolicy;
//   window?: any;
// }
interface CONFIG {
  readonly baseUrl: string;
  readonly init: {
    credentials: RequestCredentials;
  };
}
const config: CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '',
  init: { credentials: 'include' }
}

function get(params: { a: string }) {
  return fetch(`${config.baseUrl}/${params.a}`, {
    method: 'GET',
    ...config.init
  })
    .then(res => res.json())
}

function post(params: { a: string, data?: object }) {
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

function put(params: { a: string, data?: object }) {
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

function deleteReq(params: { a: string }) {
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

export function getUserSession() {
  return get({ a: 'users/session' })
}

export function getHomePage() {
  return get({ a: '' })
}

export function signIn(data: object) {
  return post({ a: 'users/signin', data })
}

export function signUp(data: object) {
  return post({ a: 'users/signup', data })
}

export function signOut() {
  return post({ a: 'users/signout' })
}

export function getTodos() {
  return get({ a: 'todos' })
}

export function addTodo(data: object) {
  return post({ a: 'todos', data })
}

export function updateTodo(data: object) {
  return put({ a: 'todos', data })
}
export function deleteTodo(id: number) {
  return deleteReq({ a: `todos/${id}` })
}
