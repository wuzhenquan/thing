const Router = require('koa-router')
const controller = require('./controller')

const router = new Router()
// get todos data
router.get('/', async ctx => {
    const todos = await controller.read()
    ctx.body = todos
})

// create todo data
router.post('/', async ctx => {
    const data = ctx.request.body
    if (!data.content) {
        ctx.throw(400, 'content is required.')
    }
    const todoInfo = await controller.create(data)
    ctx.body = todoInfo
})

module.exports = router
