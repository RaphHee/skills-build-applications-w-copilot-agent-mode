"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const activities = await Activity_1.default.find().populate('user', 'name email').sort({ activityDate: -1 });
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const activity = await Activity_1.default.create(req.body);
        const populatedActivity = await Activity_1.default.findById(activity._id).populate('user', 'name email');
        res.status(201).json(populatedActivity);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
