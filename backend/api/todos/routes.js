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
    if (typeof data.content === 'string') {
        const todoInfo = await controller.create(data)
        ctx.body = todoInfo
    } else {
        ctx.throw(400, 'content should be string.')
    }
})

module.exports = router
