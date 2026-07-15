import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface IProject extends Document {
  name: string;
  slug: string;
  client: string;
  status: string;
  visibility: "draft" | "published";
  priority: "low" | "medium" | "high";
  budget: number;
  progress: number;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  description?: string;
  gallery?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    client: { type: String, required: true, trim: true },
    status: { type: String, default: "Đang triển khai" },
    visibility: { type: String, enum: ["draft", "published"], default: "published", index: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    budget: { type: Number, default: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    image: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

const Project = (models.Project || mongoose.model<IProject>("Project", ProjectSchema)) as Model<IProject>;

export default Project;
