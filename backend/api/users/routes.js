const router = require('koa-router')()
const controller = require('./controller')

// get users data
router.get('/', async ctx => {
    const users = await controller.read()
    ctx.body = users
})

// create user data info
router.post('/', async ctx => {
    const data = ctx.request.body
    if(!data || !data.name || !data.password){
        if(!data.name) ctx.throw(401, 'name is required.')
        if(!data.password) ctx.throw(401, 'password is required.')
        return ctx.redirect('back')
    }
    const user = await controller.create({ data })
    ctx.body = user
})

router.post('/signin', async ctx => {
    const data = ctx.request.body
    const userInfo = await controller.signin({ data })
    if (!userInfo || (userInfo.name !== data.name)){
        ctx.throw(401, 'User not found. ')
        return ctx.redirect('back')
    }
    if (!userInfo || (userInfo.password !== data.password)){
        ctx.throw(401, 'The password is incorrect.')
        return ctx.redirect('back')
    }

    ctx.redirect(`/user/${userInfo.name}`)
})

module.exports = router.routes()