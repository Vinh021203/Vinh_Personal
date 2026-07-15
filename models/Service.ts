import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  icon: string;
  status: "Hiển thị" | "Ẩn";
  visibility: "draft" | "published";
  price: number;
  category: string;
  image?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, required: true },
    status: { type: String, enum: ["Hiển thị", "Ẩn"], default: "Hiển thị", index: true },
    visibility: { type: String, enum: ["draft", "published"], default: "published", index: true },
    price: { type: Number, default: 0 },
    category: { type: String, default: "General" },
    image: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Service = (models.Service || mongoose.model<IService>("Service", ServiceSchema)) as Model<IService>;

export default Service;
