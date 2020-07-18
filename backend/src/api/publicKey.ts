import * as Router from 'koa-router'
import * as fs from 'fs'

const router = new Router()

router.get('/', ctx => {
  const publicKey = fs.readFileSync(`${process.cwd()}/app/rsa/public.pem`, 'utf-8')
  ctx.body = { publicKey }
})

export default router
