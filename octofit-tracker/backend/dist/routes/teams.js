"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const teams = await Team_1.default.find().populate('members', 'name email').sort({ name: 1 });
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const team = await Team_1.default.create(req.body);
        const populatedTeam = await Team_1.default.findById(team._id).populate('members', 'name email');
        res.status(201).json(populatedTeam);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
