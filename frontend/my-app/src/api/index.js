const config = {
    host: 'http://localhost:3000',
    init: { credentials: 'include' }
}

function get(params) {
    return fetch(`${config.host}/${params.a}`, {
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
    return fetch(`${config.host}/${a}`, {
        method: 'POST',
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        ...config.init,
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
    return post({ a: 'users/signup' }, data)
}

export function signOut() {
    return post({ a: 'users/signout' })
}
