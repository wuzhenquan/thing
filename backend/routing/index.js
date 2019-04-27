const Router = require('koa-router')
const router = new Router()
const usersRouter = require('../api/users/routes')
const todosRouter = require('../api/todos/routes')

router
    .use((ctx, next) => {
        const requestToken = ctx.cookies.get('token') // token from client
        const sessionToken = ctx.session.token // token in session
        if (['/users/signin', '/users/signup', '/users/auth'].includes(ctx.request.url)) {
            return next()
        }
        if (requestToken && sessionToken && requestToken === sessionToken) {
            return next()
        } else {
            ctx.throw(406, 'please signin (did not signin or signin expired)')
            return ctx.redirect('back')
        }
    })
    .use('/users', usersRouter.routes())
    .use('/todos', todosRouter.routes())

module.exports = router