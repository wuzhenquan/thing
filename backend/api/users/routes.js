const Router = require('koa-router')
const controller = require('./controller')
const crypto = require('crypto')

const router = new Router()
// get users data
router.get('/', async ctx => {
    const users = await controller.read()
    ctx.body = users
})

// authenticate
router.get('/auth', async ctx => {
    const userInfo = (ctx.session && ctx.session.user) || {}
    if (userInfo.name) {
        ctx.body = { name: userInfo.name }
    } else {
        ctx.body = {}
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
    const userInfo = await controller.create({ data })

    const token = crypto.createHash('md5')
        .update(`${userInfo.name}${userInfo.password}`)
        .digest('hex')

    ctx.session.user = userInfo
    ctx.session.token = token
    ctx.cookies.set('token', token)

    ctx.body = {
        id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email
    }
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
    ctx.body = {
        id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email
    }
})

router.post('/signout', async ctx => {
    ctx.session.user = null
    ctx.session.token = ''
    ctx.cookies.set('token', '')
    ctx.body = {}
})

module.exports = router