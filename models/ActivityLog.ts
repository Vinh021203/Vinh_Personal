import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface IActivityLog extends Document {
  actorId?: string;
  actorName?: string;
  action: string;
  entity: "project" | "service" | "user" | "lead" | "message" | "system";
  entityId?: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    actorId: { type: String, default: "" },
    actorName: { type: String, default: "System" },
    action: { type: String, required: true, trim: true, maxlength: 80, index: true },
    entity: {
      type: String,
      enum: ["project", "service", "user", "lead", "message", "system"],
      required: true,
      index: true,
    },
    entityId: { type: String, default: "", index: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    ipAddress: { type: String, default: "", trim: true, maxlength: 80 },
    userAgent: { type: String, default: "", trim: true, maxlength: 300 },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

ActivityLogSchema.index({ createdAt: -1 });

const ActivityLog = (models.ActivityLog || mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema)) as Model<IActivityLog>;

export default ActivityLog;
