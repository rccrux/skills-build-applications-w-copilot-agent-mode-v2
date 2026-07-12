import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, default: 'intermediate' },
  age: { type: Number, required: true },
  city: { type: String, default: 'Seattle' },
  createdAt: { type: Date, default: Date.now },
});

export default model('User', userSchema);
