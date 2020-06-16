"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const fs = require("fs");
const router = new Router();
router.get('/', ctx => {
    const publicKey = fs.readFileSync(`${process.cwd()}/app/rsa/public.pem`, 'utf-8');
    ctx.body = { publicKey };
});
module.exports = router;
//# sourceMappingURL=publicKey.js.map