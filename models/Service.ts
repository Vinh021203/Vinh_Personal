import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  icon: string;
  status: "Hiển thị" | "Ẩn";
  visibility: "draft" | "published";
  price: number;
  priceLabel?: string;
  startingPrice?: number;
  category: string;
  image?: string;
  features?: string[];
  deliverables?: string[];
  process?: string[];
  timeline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  featured: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: "", trim: true, maxlength: 220 },
    icon: { type: String, required: true },
    status: { type: String, enum: ["Hiển thị", "Ẩn"], default: "Hiển thị", index: true },
    visibility: { type: String, enum: ["draft", "published"], default: "published", index: true },
    price: { type: Number, default: 0, min: 0 },
    priceLabel: { type: String, default: "", trim: true },
    startingPrice: { type: Number, default: 0, min: 0 },
    category: { type: String, default: "General", trim: true, index: true },
    image: { type: String, default: "" },
    features: { type: [String], default: [] },
    deliverables: { type: [String], default: [] },
    process: { type: [String], default: [] },
    timeline: { type: String, default: "", trim: true },
    ctaLabel: { type: String, default: "", trim: true },
    ctaHref: { type: String, default: "", trim: true },
    seoTitle: { type: String, default: "", trim: true, maxlength: 70 },
    seoDescription: { type: String, default: "", trim: true, maxlength: 170 },
    ogImage: { type: String, default: "" },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

ServiceSchema.index({ visibility: 1, status: 1, featured: -1, order: 1, createdAt: -1 });

const Service = (models.Service || mongoose.model<IService>("Service", ServiceSchema)) as Model<IService>;

export default Service;
