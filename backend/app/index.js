const Koa = require('koa')
const router = require('../routing')
const bodyparser = require('koa-bodyparser')
const database = require('../database')
const SessionStore = require('./sessionStore')
const session = require('koa-session')
const cors = require('@koa/cors')

const sessionCONFIG = {
    key: 'koa:sess', // (string) cookie key (default is koa:sess)
    maxAge: 86400000, // 1 days
    overwrite: true, // can overwrite session or not
    httpOnly: true, // set-cookie: httponly
    signed: true, // have sign cookie or not
    rolling: false,
    store: new SessionStore()
}

const app = new Koa()
app.keys = ['some secret key'] // encrypt cookie (required for signed cookies)
app.use(cors({ origin: 'http://119.29.102.27:5000', credentials: true })) // response.setHeader({Access-Control-Allow-Origin: 'http://119.29.102.27:5000', Access-Control-Allow-Credentials: true})
app.use(session(sessionCONFIG, app))
app.use(bodyparser())
app.use(router.routes())
app.use(ctx => {
    ctx.type = 'json'
    ctx.body = { text: `nodejs back end app started | ${process.env.NODE_ENV} environment` }
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
