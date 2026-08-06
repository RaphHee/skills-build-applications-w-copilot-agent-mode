"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const leaderboard = await LeaderboardEntry_1.default.find().populate('user', 'name email').sort({ points: -1 });
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const entry = await LeaderboardEntry_1.default.create(req.body);
        const populatedEntry = await LeaderboardEntry_1.default.findById(entry._id).populate('user', 'name email');
        res.status(201).json(populatedEntry);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
