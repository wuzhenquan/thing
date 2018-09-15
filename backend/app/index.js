const Koa = require('koa')
const router = require('../routing')
const bodyparser = require('koa-bodyparser')
const database = require('../database')
const SessionStore = require('./sessionStore')
const session = require('koa-session')
const cors = require('@koa/cors')

const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    store: new SessionStore()
}

const app = new Koa()
app.keys = ['some secret key']; // needed for cookie-signing
app.use(cors({ origin: 'http://www.4399.com', credentials: true }))
app.use(session(CONFIG, app))
app.use(bodyparser())
app.use(router.routes())
app.use(ctx => {
    ctx.type = 'json'

    const session = ctx.session;

    session.userInfo = {
        name: 'wuzhenquan',
        email: 'anziguoer@163.com',
        age: 28
    }
    ctx.cookies.set('login', true)
    ctx.body = 'ok'
})

exports.start = async () => {
    try {
        await database.connect()
        console.log('Connected to database')
        const port = 3000
        await app.listen(port)
        console.log(`Connected on port: ${port}`)
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
    }
}