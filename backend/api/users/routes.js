const router = require('koa-router')()

router.get('/', async ctx => {
    ctx.body = [{username: 'wuzhenquan'}]
})

router.post('/', async ctx => {
    const data = ctx.request.body
    ctx.body = {username: 'wuzhenquan'}
})

module.exports = router.routes()