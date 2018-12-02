
const config = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://119.29.102.27:3001' : '',
    init: { credentials: 'include' }
}

function get(params) {
    return fetch(`${config.baseUrl}/${params.a}`, {
        method: 'GET',
        ...config.init
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error(error)
        return {}
    })
}


function post(params) {
    const a = params.a
    const data = params.data || {}
    return fetch(`${config.baseUrl}/${a}`, {
        method: 'POST',
        ...config.init,
        cache: "no-cache",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error(error)
        return {}
    })
}

export function auth() {
    return get(({ a: 'users/auth' }))
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
