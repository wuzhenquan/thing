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
exports.start = void 0;
const Koa = require('koa');
const router = require('../routing');
const bodyparser = require('koa-bodyparser');
const database = require('../database');
const SessionStore = require('./sessionStore');
const session = require('koa-session');
const cors = require('@koa/cors');
const config = require('../config');
const generateRsa = require('./rsa/generateRsa');
generateRsa();
const sessionCONFIG = {
    key: 'sessionId',
    maxAge: 86400000,
    overwrite: true,
    signed: true,
    rolling: false,
    store: new SessionStore(),
    // we can put some cookie settings in this config (find source code from koa-session)
    httpOnly: true // set-cookie: httponly
};
const app = new Koa();
app.keys = ['some secret key']; // encrypt cookie (required for signed cookies)
app.use(cors({ origin: config.frontendOrigin, credentials: true })); // response.setHeader({Access-Control-Allow-Origin: config.frontendOrigin, Access-Control-Allow-Credentials: true})
app.use(session(sessionCONFIG, app));
app.use(bodyparser());
app.use(router.routes());
app.use(ctx => {
    ctx.type = 'json';
    ctx.body = { text: `nodejs back end app started | ${process.env.NODE_ENV} environment` };
});
exports.start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database.connect();
        console.log('Connected to database');
        const port = 3001;
        yield app.listen(port);
        console.log(`Connected on port: ${port}`);
    }
    catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }
});
//# sourceMappingURL=index.js.map