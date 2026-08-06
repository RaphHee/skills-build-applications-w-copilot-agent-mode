import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ name: 1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const safeUser = await User.findById(user._id).select('-passwordHash');
    res.status(201).json(safeUser);
  } catch (error) {
    next(error);
  }
});

export default router;