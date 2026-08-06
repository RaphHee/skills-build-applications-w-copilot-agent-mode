import { Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 0 },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default model<Workout>('Workout', workoutSchema);