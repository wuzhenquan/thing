const Router = require('koa-router')
const router = new Router()
const fs = require('fs')

router.get('/', ctx => {
  const publicKey = fs.readFileSync(__dirname + '/../rsa/pem/public.pem', 'utf-8')
  ctx.body = { publicKey }
})

module.exports = router
