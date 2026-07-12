"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, default: 'intermediate' },
    age: { type: Number, required: true },
    city: { type: String, default: 'Seattle' },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
