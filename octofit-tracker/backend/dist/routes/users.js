"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const users = await User_1.default.find().select('-passwordHash').sort({ name: 1 });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const user = await User_1.default.create(req.body);
        const safeUser = await User_1.default.findById(user._id).select('-passwordHash');
        res.status(201).json(safeUser);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
