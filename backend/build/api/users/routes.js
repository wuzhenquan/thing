"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller = require('./controller');
const crypto = require('crypto');
const fs = require('fs');
const router = new Router();
// decrypt by private key
const decryptPassword = encryptedPassword => {
    const privateKey = fs.readFileSync(`${process.cwd()}/app/rsa/private.pem`, 'utf8');
    const buffer = Buffer.from(encryptedPassword, 'base64'); //转化格式
    const password = crypto
        .privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, buffer)
        .toString('utf8');
    return password;
};
// update response ctx
const setSignInOrSignOutCtx = (ctx, userInfo) => {
    const { id, name, email } = userInfo;
    ctx.session.id = ctx.cookies.get('sessionId');
    ctx.session.user = { id, name, email };
    ctx.body = { id, name, email };
};
// get users data
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield controller.read();
    ctx.body = users;
}));
// authenticate
router.get('/session', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = (ctx.session && ctx.session.id && ctx.session.user) || {};
    if (userInfo.name) {
        ctx.body = { name: userInfo.name };
    }
    else {
        ctx.body = {};
    }
}));
const cryptPwd = encryptedPassword => {
    const md5 = crypto.createHash('md5');
    const result = md5.update(encryptedPassword).digest('hex');
    return result;
};
// create user data info
router.post('/signup', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    if (data && data.name && data.email && data.password) {
        const encryptedPassword = decryptPassword(data.password);
        const md5Password = cryptPwd(encryptedPassword);
        data.password = md5Password;
        const duplicateUsers = yield controller.read({ name: data.name });
        if (duplicateUsers.length !== 0) {
            const userInfo = yield controller.create({ data });
            setSignInOrSignOutCtx(ctx, userInfo);
        }
        else {
            ctx.throw(401, 'The user name has been registered. ');
        }
    }
    else {
        if (!data.name)
            ctx.throw(401, 'name is required.');
        if (!data.password)
            ctx.throw(401, 'password is required.');
        return ctx.redirect('back');
    }
}));
router.post('/signin', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    const encryptedPassword = decryptPassword(data.password);
    const md5Password = cryptPwd(encryptedPassword);
    const userInfo = yield controller.signin({ data });
    // validation
    if (!userInfo || userInfo.name !== data.name) {
        ctx.throw(401, 'User not found. ');
        return ctx.redirect('back');
    }
    if (!userInfo || userInfo.password !== md5Password) {
        ctx.throw(401, 'The password is incorrect.');
        return ctx.redirect('back');
    }
    setSignInOrSignOutCtx(ctx, userInfo);
}));
router.post('/signout', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.id = '';
    ctx.session.user = null;
    ctx.cookies.set('sessionId', '');
    ctx.body = {};
}));
module.exports = router;
//# sourceMappingURL=routes.js.map