"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./models/user"));
const team_1 = __importDefault(require("./models/team"));
const activity_1 = __importDefault(require("./models/activity"));
const leaderboard_1 = __importDefault(require("./models/leaderboard"));
const workout_1 = __importDefault(require("./models/workout"));
const app = (0, express_1.default)();
exports.app = app;
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
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error('Origin not allowed by CORS'));
    },
}));
app.use(express_1.default.json());
const ensureDatabaseConnection = async () => {
    if (mongoose_1.default.connection.readyState !== 1) {
        await mongoose_1.default.connect(mongoUri);
    }
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiUrl: baseUrl });
});
const createRoute = (resource, model) => {
    app.get(`/api/${resource}/`, async (_req, res) => {
        try {
            await ensureDatabaseConnection();
            const documents = await model.find({});
            res.json({ resource, count: documents.length, items: documents, apiUrl: baseUrl });
        }
        catch (error) {
            res.status(500).json({ error: 'Unable to fetch data' });
        }
    });
};
createRoute('users', user_1.default);
createRoute('teams', team_1.default);
createRoute('activities', activity_1.default);
createRoute('leaderboard', leaderboard_1.default);
createRoute('workouts', workout_1.default);
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
if (require.main === module) {
    startServer();
}
