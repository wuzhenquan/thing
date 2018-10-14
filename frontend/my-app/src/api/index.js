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
    })
}

export function auth() {
    return get(({ a: 'users/auth' }))
}

export function getHomePage() {
    return get({ a: '' })
}
