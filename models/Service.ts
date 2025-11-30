import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  icon: string; // 'Code2', 'Settings', etc.
  status: "Hiển thị" | "Ẩn";
  price: number;
  category: string;
  image?: string; // URL ảnh thumbnail
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    status: { type: String, enum: ["Hiển thị", "Ẩn"], default: "Hiển thị" },
    price: { type: Number, default: 0 },
    category: { type: String, default: "General" },
    image: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
