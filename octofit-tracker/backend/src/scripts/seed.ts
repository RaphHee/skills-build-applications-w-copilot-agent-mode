import mongoose from 'mongoose';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        passwordHash: 'seeded-password-hash-1',
        profile: {
          bio: 'Trail runner building endurance for a spring half marathon.',
          goal: 'Run 25 miles per week',
          avatarUrl: 'https://images.example.com/octofit/maya.png',
        },
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        passwordHash: 'seeded-password-hash-2',
        profile: {
          bio: 'Strength training enthusiast focused on functional movement.',
          goal: 'Complete three strength sessions weekly',
          avatarUrl: 'https://images.example.com/octofit/jordan.png',
        },
      },
      {
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        passwordHash: 'seeded-password-hash-3',
        profile: {
          bio: 'Cyclist tracking recovery, cadence, and weekly climbing totals.',
          goal: 'Climb 4,000 feet each week',
          avatarUrl: 'https://images.example.com/octofit/priya.png',
        },
      },
      {
        name: 'Sam Rivera',
        email: 'sam.rivera@example.com',
        passwordHash: 'seeded-password-hash-4',
        profile: {
          bio: 'Busy parent using short workouts to stay consistent.',
          goal: 'Move for 30 minutes daily',
          avatarUrl: 'https://images.example.com/octofit/sam.png',
        },
      },
    ]);

    await Team.insertMany([
      {
        name: 'Cardio Crew',
        description: 'Runners and cyclists chasing steady aerobic progress.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Squad',
        description: 'Athletes focused on strength, mobility, and consistency.',
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Outdoor Run',
        durationMinutes: 52,
        caloriesBurned: 520,
        activityDate: new Date('2026-08-01T06:45:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 45,
        caloriesBurned: 360,
        activityDate: new Date('2026-08-02T17:30:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 90,
        caloriesBurned: 820,
        activityDate: new Date('2026-08-03T12:15:00Z'),
      },
      {
        user: users[3]._id,
        type: 'Yoga Flow',
        durationMinutes: 30,
        caloriesBurned: 140,
        activityDate: new Date('2026-08-04T20:00:00Z'),
      },
      {
        user: users[0]._id,
        type: 'Recovery Walk',
        durationMinutes: 35,
        caloriesBurned: 180,
        activityDate: new Date('2026-08-05T18:10:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[2]._id, points: 1840, rank: 1 },
      { user: users[0]._id, points: 1715, rank: 2 },
      { user: users[1]._id, points: 1490, rank: 3 },
      { user: users[3]._id, points: 1185, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        description: 'A gentle full-body routine for loosening hips, shoulders, and hamstrings before the day starts.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow stretch', 'World greatest stretch', 'Glute bridge', 'Shoulder dislocates'],
      },
      {
        title: 'Lunch Break Strength Circuit',
        description: 'A compact circuit that mixes bodyweight strength with light conditioning.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Goblet squats', 'Push-ups', 'Reverse lunges', 'Plank rows', 'Jump rope intervals'],
      },
      {
        title: 'Hill Climb Power Ride',
        description: 'Structured cycling intervals designed to improve climbing power and aerobic control.',
        difficulty: 'advanced',
        durationMinutes: 55,
        exercises: ['Warm-up spin', 'Seated climbs', 'Standing attacks', 'Tempo recovery', 'Cool-down spin'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
