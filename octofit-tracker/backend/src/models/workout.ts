import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, default: 'moderate' },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, default: 'full body' },
  createdAt: { type: Date, default: Date.now },
});

export default model('Workout', workoutSchema);
