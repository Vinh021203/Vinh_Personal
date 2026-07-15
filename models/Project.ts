import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface IProject extends Document {
  name: string;
  slug: string;
  client: string;
  category?: string;
  industry?: string;
  status: string;
  visibility: "draft" | "published";
  priority: "low" | "medium" | "high";
  budget: number;
  progress: number;
  summary?: string;
  content?: string;
  clientLogo?: string;
  duration?: string;
  startDate?: Date;
  endDate?: Date;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  description?: string;
  gallery?: string[];
  tags?: string[];
  technologies?: string[];
  features?: string[];
  results?: string[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  featured?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    client: { type: String, required: true, trim: true },
    category: { type: String, default: "", trim: true, index: true },
    industry: { type: String, default: "", trim: true },
    status: { type: String, default: "Đang triển khai", index: true },
    visibility: { type: String, enum: ["draft", "published"], default: "published", index: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium", index: true },
    budget: { type: Number, default: 0, min: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    summary: { type: String, default: "", trim: true, maxlength: 240 },
    content: { type: String, default: "" },
    clientLogo: { type: String, default: "" },
    duration: { type: String, default: "", trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    role: { type: String, default: "", trim: true },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    image: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    features: { type: [String], default: [] },
    results: { type: [String], default: [] },
    seoTitle: { type: String, default: "", trim: true, maxlength: 70 },
    seoDescription: { type: String, default: "", trim: true, maxlength: 170 },
    ogImage: { type: String, default: "" },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

ProjectSchema.index({ visibility: 1, featured: -1, order: 1, createdAt: -1 });

const Project = (models.Project || mongoose.model<IProject>("Project", ProjectSchema)) as Model<IProject>;

export default Project;
