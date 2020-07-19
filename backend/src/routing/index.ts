import { DefaultState, Context } from 'koa';
import * as Router from 'koa-router'

const router = new Router<DefaultState, Context>()
import usersRouter from '../api/users/routes'
import todosRouter from '../api/todos/routes'
import publicKeyRouter from '../api/publicKey'

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
      ctx.throw(401, 'please signin (did not signin or signin expired)')
      return ctx.redirect('back')
    }
  })
  .use('/publickey', publicKeyRouter.routes())
  .use('/users', usersRouter.routes())
  .use('/todos', todosRouter.routes())

export default router
