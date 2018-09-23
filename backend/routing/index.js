const Router = require('koa-router')
const router = new Router()
const usersRouter = require('../api/users/routes')

router
    .use((ctx, next) => {
        const requestToken = ctx.cookies.get('token')
        const sessionToken = ctx.session.token
        if(['/users/signin','/users/signup'].includes(ctx.request.url)){
            return next()
        }
        if (requestToken !== sessionToken) {
            ctx.throw(406, 'please signin (did not signin or signin expired)')
            return ctx.redirect('back')
        } else {
            return next()
        }

    })
    .use('/users', usersRouter.routes())

module.exports = router