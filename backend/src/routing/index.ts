import { DefaultState, Context } from 'koa';
import * as Router from 'koa-router'

const router = new Router<DefaultState, Context>()
const usersRouter = require('../api/users/routes')
const todosRouter = require('../api/todos/routes')
const publicKeyRouter = require('../api/publicKey')

router
  .use((ctx, next) => {
    const requestSessionId = ctx.cookies.get('sessionId') // token from client
    const sessionId = ctx.session.id // token in session
    if (['/publickey', '/users/signin', '/users/signup'].includes(ctx.request.url)) {
      return next()
    }
    if (requestSessionId && sessionId && requestSessionId === sessionId) {
      return next()
    } else {
      ctx.throw(406, 'please signin (did not signin or signin expired)')
      return ctx.redirect('back')
    }
  })
  .use('/publickey', publicKeyRouter.routes())
  .use('/users', usersRouter.routes())
  .use('/todos', todosRouter.routes())

module.exports = router
