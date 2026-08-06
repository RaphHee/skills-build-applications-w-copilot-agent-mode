import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const teams = await Team.find().populate('members', 'name email').sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    const populatedTeam = await Team.findById(team._id).populate('members', 'name email');
    res.status(201).json(populatedTeam);
  } catch (error) {
    next(error);
  }
});

export default router;