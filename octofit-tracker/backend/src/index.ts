import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', baseUrl });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});

export default app;
