"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.create = exports.read = void 0;
const model_1 = require("./model");
exports.read = () => {
    // learn from https://stackoverflow.com/questions/5825520/in-mongoose-how-do-i-sort-by-date-node-js
    return model_1.default.find().sort({ update_on: 'descending' });
};
exports.create = (data = {}) => {
    return model_1.default.create(data);
};
exports.updateOne = (filter, doc) => {
    return model_1.default.updateOne(filter, doc);
};
exports.deleteOne = id => {
    return model_1.default.deleteOne({ _id: id });
};
//# sourceMappingURL=controller.js.map