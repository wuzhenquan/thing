const Koa = require('koa')


const app = new Koa()

app.use(async ctx => {
    ctx.body = 'hello world'
})

exports.start = async () => {
    try {
        console.log('Connected to database')
        const port = 3000
        await app.listen(3000)
        console.log(`Connected on port: ${port}`)
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
    }
}