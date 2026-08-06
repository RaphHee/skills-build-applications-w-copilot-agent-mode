"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const workouts = await Workout_1.default.find().sort({ difficulty: 1, title: 1 });
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const workout = await Workout_1.default.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
