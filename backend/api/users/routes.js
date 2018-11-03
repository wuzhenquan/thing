const Router = require('koa-router')
const router = new Router()
const controller = require('./controller')
const crypto = require('crypto')

// get users data
router.get('/', async ctx => {
    const users = await controller.read()
    ctx.body = users
})

router.get('/auth', async ctx => {
    console.log(ctx.session, 'ctx.session')
    if (ctx.session && ctx.session.user && ctx.session.user.name) {
        ctx.body = { auth: true }
    } else {
        ctx.body = { auth: false }
    }
})

// create user data info
router.post('/signup', async ctx => {
    const data = ctx.request.body
    if (!data || !data.name || !data.password) {
        if (!data.name) ctx.throw(401, 'name is required.')
        if (!data.password) ctx.throw(401, 'password is required.')
        return ctx.redirect('back')
    }
    const user = await controller.create({ data })
    ctx.body = user
})

router.post('/signin', async ctx => {
    const data = ctx.request.body
    const userInfo = await controller.signin({ data })

    // validation
    if (!userInfo || (userInfo.name !== data.name)) {
        ctx.throw(401, 'User not found. ')
        return ctx.redirect('back')
    }
    if (!userInfo || (userInfo.password !== data.password)) {
        ctx.throw(401, 'The password is incorrect.')
        return ctx.redirect('back')
    }

    const token = crypto.createHash('md5')
        .update(`${userInfo.name}${userInfo.password}`)
        .digest('hex')

    ctx.session.user = userInfo
    ctx.session.token = token
    ctx.cookies.set('token', token)
    ctx.body = userInfo
    // ctx.redirect(`/user/${userInfo.name}`)
})

module.exports = router