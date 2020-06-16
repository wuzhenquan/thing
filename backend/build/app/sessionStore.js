var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const schema = {
    _id: String,
    data: Object,
    updatedAt: {
        default: new Date(),
        expires: 86400,
        type: Date
    }
};
const mongoose = require('mongoose');
class MongooseStore {
    constructor({ collection = 'sessions', connection = mongoose, expires = 86400, name = 'Session' } = {}) {
        const updatedAt = Object.assign(Object.assign({}, schema.updatedAt), { expires });
        const { Schema } = connection;
        this.session = connection.model(name, new Schema(Object.assign(Object.assign({}, schema), { updatedAt })), collection);
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { session } = this;
            return session.remove({ _id: id });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { session } = this;
            const { data } = (yield session.findById(id)) || {};
            return data;
        });
    }
    set(id, data, maxAge, { changed, rolling }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (changed || rolling) {
                const { session } = this;
                const record = { _id: id, data, updatedAt: new Date() };
                yield session.findByIdAndUpdate(id, record, { upsert: true, safe: true });
            }
            return data;
        });
    }
}
module.exports = MongooseStore;
//# sourceMappingURL=sessionStore.js.map