import { Schema, model, Types } from 'mongoose';

export interface Activity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<Activity>('Activity', activitySchema);