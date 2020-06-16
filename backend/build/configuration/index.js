"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../config");
exports.get = key => {
    return process.env[key] || config[key];
};
//# sourceMappingURL=index.js.map