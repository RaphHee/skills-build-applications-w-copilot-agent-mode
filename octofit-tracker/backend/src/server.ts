import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const apiBaseUrl = `${apiOrigin}/api`;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});

export default app;