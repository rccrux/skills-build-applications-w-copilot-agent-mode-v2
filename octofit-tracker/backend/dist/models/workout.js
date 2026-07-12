"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, default: 'moderate' },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, default: 'full body' },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
