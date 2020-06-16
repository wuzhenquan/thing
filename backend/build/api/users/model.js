"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = require('mongoose');
const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    create_on: { type: Date, default: Date.now },
    update_on: { type: Date, default: Date.now }
});
exports.default = mongoose.model('User', UserSchema);
//# sourceMappingURL=model.js.map