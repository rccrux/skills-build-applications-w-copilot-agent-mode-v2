import mongoose, { Schema, model } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, default: 'fitness' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  goal: { type: String, default: 'Complete 100 workouts together' },
  createdAt: { type: Date, default: Date.now },
});

export default model('Team', teamSchema);
