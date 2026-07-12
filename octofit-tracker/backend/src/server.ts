import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user';
import Team from './models/team';
import Activity from './models/activity';
import Leaderboard from './models/leaderboard';
import Workout from './models/workout';

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

if (codespaceName) {
  allowedOrigins.push(`https://${codespaceName}-5173.app.github.dev`);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
  }),
);
app.use(express.json());

const ensureDatabaseConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(mongoUri);
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiUrl: baseUrl });
});

const createRoute = (resource: string, model: any) => {
  app.get(`/api/${resource}/`, async (_req, res) => {
    try {
      await ensureDatabaseConnection();
      const documents = await model.find({});
      res.json({ resource, count: documents.length, items: documents, apiUrl: baseUrl });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch data' });
    }
  });
};

createRoute('users', User);
createRoute('teams', Team);
createRoute('activities', Activity);
createRoute('leaderboard', Leaderboard);
createRoute('workouts', Workout);

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

export { app, startServer };
