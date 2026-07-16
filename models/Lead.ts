import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  service?: string;
  budget?: string;
  projectType?: string;
  timeline?: string;
  subject?: string;
  message: string;
  source: "contact" | "chatbot" | "manual";
  priority: "low" | "medium" | "high";
  status: "new" | "contacted" | "qualified" | "archived" | "spam";
  isSpam?: boolean;
  spamScore?: number;
  spamReason?: string;
  assignedTo?: string;
  notes?: string;
  lastContactAt?: Date;
  nextFollowUpAt?: Date;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, default: "", trim: true, maxlength: 40 },
    company: { type: String, default: "", trim: true, maxlength: 160 },
    website: { type: String, default: "", trim: true, maxlength: 220 },
    service: { type: String, default: "", trim: true, maxlength: 120 },
    budget: { type: String, default: "", trim: true, maxlength: 120 },
    projectType: { type: String, default: "", trim: true, maxlength: 120 },
    timeline: { type: String, default: "", trim: true, maxlength: 120 },
    subject: { type: String, default: "", trim: true, maxlength: 180 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    source: { type: String, enum: ["contact", "chatbot", "manual"], default: "contact", index: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium", index: true },
    status: { type: String, enum: ["new", "contacted", "qualified", "archived", "spam"], default: "new", index: true },
    isSpam: { type: Boolean, default: false, index: true },
    spamScore: { type: Number, default: 0 },
    spamReason: { type: String, default: "", trim: true, maxlength: 500 },
    assignedTo: { type: String, default: "", index: true },
    notes: { type: String, default: "", trim: true, maxlength: 3000 },
    lastContactAt: { type: Date },
    nextFollowUpAt: { type: Date, index: true },
    utmSource: { type: String, default: "", trim: true, maxlength: 120 },
    utmMedium: { type: String, default: "", trim: true, maxlength: 120 },
    utmCampaign: { type: String, default: "", trim: true, maxlength: 160 },
    ipAddress: { type: String, default: "", trim: true, maxlength: 80 },
    userAgent: { type: String, default: "", trim: true, maxlength: 300 },
  },
  { timestamps: true },
);

LeadSchema.index({ status: 1, priority: -1, createdAt: -1 });

const Lead = (models.Lead || mongoose.model<ILead>("Lead", LeadSchema)) as Model<ILead>;

export default Lead;
