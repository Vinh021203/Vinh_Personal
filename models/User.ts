import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  avatar?: string;
  phone?: string;
  bio?: string;
  permissions?: string[];
  emailVerified?: boolean;
  lastSeenAt?: Date;
  lastLogin?: Date;
  loginCount?: number;
  passwordChangedAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  preferences?: {
    notifications?: {
      email?: boolean;
      browser?: boolean;
      leadAlerts?: boolean;
      messageAlerts?: boolean;
      systemAlerts?: boolean;
    };
    appearance?: {
      language?: "vi" | "en";
      theme?: "system" | "light" | "dark";
      compactMode?: boolean;
      reduceMotion?: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user", index: true },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
    avatar: { type: String, default: "" },
    phone: { type: String, default: "", trim: true },
    bio: { type: String, default: "", trim: true, maxlength: 500 },
    permissions: { type: [String], default: [] },
    emailVerified: { type: Boolean, default: false, index: true },
    lastSeenAt: { type: Date },
    lastLogin: { type: Date },
    loginCount: { type: Number, default: 0 },
    passwordChangedAt: { type: Date },
    resetPasswordToken: { type: String, default: "", select: false },
    resetPasswordExpires: { type: Date, select: false },
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        browser: { type: Boolean, default: false },
        leadAlerts: { type: Boolean, default: true },
        messageAlerts: { type: Boolean, default: true },
        systemAlerts: { type: Boolean, default: true },
      },
      appearance: {
        language: { type: String, enum: ["vi", "en"], default: "vi" },
        theme: { type: String, enum: ["system", "light", "dark"], default: "light" },
        compactMode: { type: Boolean, default: false },
        reduceMotion: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true },
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
