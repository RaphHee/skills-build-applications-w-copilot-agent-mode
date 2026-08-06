"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    profile: {
        bio: { type: String },
        goal: { type: String },
        avatarUrl: { type: String },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
