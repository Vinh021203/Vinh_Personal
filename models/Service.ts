import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  icon: string; // ví dụ: 'Code2', 'MonitorSmartphone',...
  status: 'Hiển thị' | 'Ẩn';
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    status: { type: String, enum: ['Hiển thị', 'Ẩn'], default: 'Hiển thị' },
  },
  { timestamps: true }
);

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
