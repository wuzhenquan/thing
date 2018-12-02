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
app.use(cors({ origin: 'http://119.29.102.27:5000', credentials: true }))
app.use(session(CONFIG, app))
app.use(bodyparser())
app.use(router.routes())
app.use(ctx => {
    ctx.type = 'json'
    ctx.body = { text: 'welcome' }
    // console.log(ctx.body,'ctx.body 1')
})

exports.start = async () => {
    try {
        await database.connect()
        console.log('Connected to database')
        const port = 3001
        await app.listen(port)
        console.log(`Connected on port: ${port}`)
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
    }
}