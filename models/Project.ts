// models/Project.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  name: string;
  slug: string;
  client: string;
  status: string;
  priority: "low" | "medium" | "high";
  budget: number;
  progress: number;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  description?: string;
  gallery?: string[]; // Thêm trường Gallery theo yêu cầu
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    status: { type: String, default: "Đang triển khai" },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    budget: { type: Number, default: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    image: String,
    gallery: [String], // Thêm trường Gallery
    description: { type: String, default: "" },
    tags: [String],
  },
  { timestamps: true }
);

// QUAN TRỌNG: Xóa model cũ để Mongoose load lại Schema mới (Chỉ cần thiết khi dev đổi schema liên tục)
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
