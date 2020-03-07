const Router = require('koa-router')
const controller = require('./controller')
const crypto = require('crypto')

const router = new Router()

const getUserSetting = (userInfo = {}) => {
  const user = userInfo
  const id = user._id
  const name = user.name
  const email = user.email
  const password = user.password
  const token = crypto
    .createHash('md5')
    .update(`${name}${password}`)
    .digest('hex')
  const resBody = { id, name, email }
  return { user, token, resBody }
}
const setSignCtx = (ctx, setting) => {
  const { user, token, resBody } = setting
  ctx.cookies.set('token', token)
  ctx.session = { user, token }
  ctx.body = resBody
}
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
  setSignCtx(ctx, getUserSetting(userInfo))
})

router.post('/signin', async ctx => {
  const data = ctx.request.body
  const userInfo = await controller.signin({ data })

  // validation
  if (!userInfo || userInfo.name !== data.name) {
    ctx.throw(401, 'User not found. ')
    return ctx.redirect('back')
  }
  if (!userInfo || userInfo.password !== data.password) {
    ctx.throw(401, 'The password is incorrect.')
    return ctx.redirect('back')
  }
  setSignCtx(ctx, getUserSetting(userInfo))
})

router.post('/signout', async ctx => {
  ctx.session.user = null
  ctx.session.token = ''
  ctx.cookies.set('token', '')
  ctx.body = {}
})

module.exports = router
