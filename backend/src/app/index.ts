import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as database from '../database/index'
import * as session from 'koa-session'
import * as cors from '@koa/cors'
import router from '../routing'
import configuration from '../configuration'
import generateRsa from './rsa/generateRsa'
import sessionStore from './sessionStore'
generateRsa()
const sessionCONFIG = {
  key: 'sessionId', // (string) cookie key (default is koa:sess)
  maxAge: 86400000, // 1 days
  overwrite: true, // can overwrite session or not
  signed: true, // have sign cookie or not
  rolling: false,
  store: new sessionStore(),
  // we can put some cookie settings in this config (find source code from koa-session)
  httpOnly: true // set-cookie: httponly
}

const app = new Koa()
app.keys = ['some secret key'] // encrypt cookie (required for signed cookies)
app.use(cors({ origin: configuration.frontendOrigin, credentials: true })) // response.setHeader({Access-Control-Allow-Origin: config.frontendOrigin, Access-Control-Allow-Credentials: true})
app.use(session(sessionCONFIG, app))
app.use(bodyparser())
app.use(router.routes())
app.use(ctx => {
  ctx.type = 'json'
  ctx.body = { text: `nodejs back end app started | ${process.env.NODE_ENV} environment` }
})

export const start = async () => {
  try {
    await database.connect()
    console.log('Connected to database')
    const port = 3001
    await app.listen(port)
    console.log(`Connected on port: ${port}`)
  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
  }
}