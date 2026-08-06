import { Schema, model, Types } from 'mongoose';

export interface LeaderboardEntry {
  user: Types.ObjectId;
  points: number;
  rank?: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true }
);

export default model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);