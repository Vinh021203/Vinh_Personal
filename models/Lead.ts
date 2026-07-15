import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  subject?: string;
  message: string;
  source: "contact" | "chatbot" | "manual";
  status: "new" | "contacted" | "qualified" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, default: "", trim: true, maxlength: 40 },
    service: { type: String, default: "", trim: true, maxlength: 120 },
    budget: { type: String, default: "", trim: true, maxlength: 120 },
    subject: { type: String, default: "", trim: true, maxlength: 180 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    source: { type: String, enum: ["contact", "chatbot", "manual"], default: "contact", index: true },
    status: { type: String, enum: ["new", "contacted", "qualified", "archived"], default: "new", index: true },
  },
  { timestamps: true },
);

const Lead = (models.Lead || mongoose.model<ILead>("Lead", LeadSchema)) as Model<ILead>;

export default Lead;
