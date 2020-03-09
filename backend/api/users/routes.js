const Router = require('koa-router')
const controller = require('./controller')
const crypto = require('crypto')
const fs = require('fs')

const router = new Router()

// decrypt by private key
const decryptPassword = encryptedPassword => {
  const privateKey = fs.readFileSync(`${__dirname}/../../rsa/private.pem`, 'utf8')
  const buffer = Buffer.from(encryptedPassword, 'base64') //转化格式
  const password = crypto
    .privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      buffer
    )
    .toString('utf8')
  return password
}

const getToken = (userInfo = {}) => {
  const name = userInfo.name
  const password = decryptPassword(userInfo.password)
  const token = crypto
    .createHash('md5')
    .update(`${name}${password}`)
    .digest('hex')
  return token
}

// update response ctx
const setSignInOrSignOutCtx = (ctx, userInfo) => {
  const { id, name, email } = userInfo
  const token = getToken(userInfo)

  ctx.cookies.set('token', token)
  ctx.session = { user: userInfo, token }
  ctx.body = { id, name, email }
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
  setSignInOrSignOutCtx(ctx, userInfo)
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
  setSignInOrSignOutCtx(ctx, userInfo)
})

router.post('/signout', async ctx => {
  ctx.session.user = null
  ctx.session.token = ''
  ctx.cookies.set('token', '')
  ctx.body = {}
})

module.exports = router
