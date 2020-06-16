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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller = require('./controller');
const router = new Router();
// get todos data
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield controller.read();
    ctx.body = todos;
}));
// create todo data item
router.post('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    if (typeof data.content === 'string') {
        const todoInfo = yield controller.create(data);
        ctx.body = todoInfo;
    }
    else {
        ctx.throw(400, 'content should be string.');
    }
}));
// edit todo data item
router.put('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let data = ctx.request.body;
    if (typeof data.content === 'string' && data.id) {
        const { id } = data, doc = __rest(data, ["id"]);
        const filter = { _id: id };
        const todoInfo = yield controller.updateOne(filter, doc);
        ctx.body = todoInfo;
    }
    else if (!data.id) {
        ctx.throw(400, 'id is required.');
    }
    else {
        ctx.throw(400, 'content should be string.');
    }
}));
// delete todo data item
router.delete('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const id = ctx.params.id;
    const info = yield controller.deleteOne(id);
    ctx.body = info;
}));
module.exports = router;
//# sourceMappingURL=routes.js.map