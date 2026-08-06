import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().populate('user', 'name email').sort({ activityDate: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);
    const populatedActivity = await Activity.findById(activity._id).populate('user', 'name email');
    res.status(201).json(populatedActivity);
  } catch (error) {
    next(error);
  }
});

export default router;