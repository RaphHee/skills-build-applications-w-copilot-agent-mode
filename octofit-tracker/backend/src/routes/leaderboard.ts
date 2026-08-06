import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user', 'name email').sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    const populatedEntry = await LeaderboardEntry.findById(entry._id).populate('user', 'name email');
    res.status(201).json(populatedEntry);
  } catch (error) {
    next(error);
  }
});

export default router;