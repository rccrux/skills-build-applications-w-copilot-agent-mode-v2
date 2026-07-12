"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
        ]);
        const users = await user_1.default.insertMany([
            {
                name: 'Maya Chen',
                email: 'maya.chen@example.com',
                fitnessLevel: 'advanced',
                age: 29,
                city: 'Seattle',
            },
            {
                name: 'Jordan Rivera',
                email: 'jordan.rivera@example.com',
                fitnessLevel: 'intermediate',
                age: 34,
                city: 'Austin',
            },
            {
                name: 'Asha Patel',
                email: 'asha.patel@example.com',
                fitnessLevel: 'beginner',
                age: 27,
                city: 'Denver',
            },
        ]);
        const teams = await team_1.default.insertMany([
            {
                name: 'Northstar Striders',
                sport: 'running',
                members: [users[0]._id, users[1]._id],
                goal: 'Run 200 km this month',
            },
            {
                name: 'Peak Performers',
                sport: 'strength',
                members: [users[2]._id],
                goal: 'Complete 30 strength sessions',
            },
        ]);
        await activity_1.default.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                durationMinutes: 45,
                calories: 540,
                date: new Date('2026-07-10'),
            },
            {
                userId: users[1]._id,
                type: 'cycle',
                durationMinutes: 60,
                calories: 610,
                date: new Date('2026-07-11'),
            },
            {
                userId: users[2]._id,
                type: 'yoga',
                durationMinutes: 35,
                calories: 220,
                date: new Date('2026-07-12'),
            },
        ]);
        await leaderboard_1.default.insertMany([
            {
                userId: users[0]._id,
                score: 980,
                rank: 1,
                streak: 7,
            },
            {
                userId: users[1]._id,
                score: 910,
                rank: 2,
                streak: 4,
            },
            {
                userId: users[2]._id,
                score: 840,
                rank: 3,
                streak: 2,
            },
        ]);
        await workout_1.default.insertMany([
            {
                title: 'HIIT Cardio Blast',
                description: 'Short intervals to boost endurance and burn calories.',
                difficulty: 'advanced',
                durationMinutes: 30,
                focus: 'cardio',
            },
            {
                title: 'Core Stability Flow',
                description: 'A guided mobility and core routine for posture.',
                difficulty: 'beginner',
                durationMinutes: 25,
                focus: 'mobility',
            },
            {
                title: 'Strength Builder',
                description: 'Compound lifts focused on full-body strength.',
                difficulty: 'intermediate',
                durationMinutes: 45,
                focus: 'strength',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
