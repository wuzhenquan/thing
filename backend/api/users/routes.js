const Router = require('koa-router')
const controller = require('./controller')
const crypto = require('crypto')
const fs = require('fs')

const router = new Router()

// decrypt by private key
const decryptPassword = encryptedPassword => {

  const privateKey = fs.readFileSync(`${process.cwd()}/app/rsa/private.pem`, 'utf8')
  console.log(privateKey,'privateKey');
  console.log(encryptedPassword,'encryptedPassword');
  
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

// update response ctx
const setSignInOrSignOutCtx = (ctx, userInfo) => {
  const { id, name, email } = userInfo
  ctx.session.id = id
  ctx.body = { id, name, email }
}
// get users data
router.get('/', async ctx => {
  const users = await controller.read()
  ctx.body = users
})

// authenticate
router.get('/auth', async ctx => {
  const sessionId = ctx.session && ctx.session.id
  if (sessionId) {
    ctx.body = { sessionId }
  } else {
    ctx.body = {}
  }
})

const getMd5password = encryptedPassword => {
  const saltPassword = `${encryptedPassword}wzq`
  const password = crypto
    .createHash('md5')
    .update(saltPassword)
    .digest('hex')
  return password
}

// create user data info
router.post('/signup', async ctx => {
  const data = ctx.request.body
  if (data && data.name && data.email && data.password) {
    const encryptedPassword = decryptPassword(data.password)
    const md5Password = getMd5password(encryptedPassword)
    data.password = md5Password
    const userInfo = await controller.create({ data })
    setSignInOrSignOutCtx(ctx, userInfo)
  } else {
    if (!data.name) ctx.throw(401, 'name is required.')
    if (!data.password) ctx.throw(401, 'password is required.')
    return ctx.redirect('back')
  }
})

router.post('/signin', async ctx => {
  const data = ctx.request.body
  const encryptedPassword = decryptPassword(data.password)
  const md5Password = getMd5password(encryptedPassword)
  const userInfo = await controller.signin({ data })
  // validation
  if (!userInfo || userInfo.name !== data.name) {
    ctx.throw(401, 'User not found. ')
    return ctx.redirect('back')
  }
  if (!userInfo || userInfo.password !== md5Password) {
    ctx.throw(401, 'The password is incorrect.')
    return ctx.redirect('back')
  }
  setSignInOrSignOutCtx(ctx, userInfo)
})

router.post('/signout', async ctx => {
  ctx.session.id = ''
  // ctx.cookies.set('token', '')
  ctx.body = {}
})

module.exports = router
