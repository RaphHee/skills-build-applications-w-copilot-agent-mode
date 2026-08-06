import { Schema, model } from 'mongoose';

export interface User {
  name: string;
  email: string;
  passwordHash?: string;
  profile?: {
    bio?: string;
    goal?: string;
    avatarUrl?: string;
  };
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    profile: {
      bio: { type: String },
      goal: { type: String },
      avatarUrl: { type: String },
    },
  },
  { timestamps: true }
);

export default model<User>('User', userSchema);