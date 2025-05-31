// models/Project.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  slug: string;
  client: string;
  status: 'Hoàn thành' | 'Đang triển khai';
  image?: string;
  description?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    status: {
      type: String,
      enum: ['Hoàn thành', 'Đang triển khai'],
      default: 'Đang triển khai',
    },
    image: String,
    description: { type: String, default: '' },
    tags: [String],
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
