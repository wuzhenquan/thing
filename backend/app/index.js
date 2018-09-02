const Koa = require('koa')
const router = require('../routing')
const bodyparser = require('koa-bodyparser')
const database = require('../database')


const app = new Koa()
app.use(bodyparser())
app.use(router.routes())
app.use(ctx => { ctx.type = 'json' })

exports.start = async () => {
    try {
        await database.connect()
        console.log('Connected to database')
        const port = 3000
        await app.listen(3000)
        console.log(`Connected on port: ${port}`)
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
    }
}