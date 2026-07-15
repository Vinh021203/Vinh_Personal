import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface IActivityLog extends Document {
  actorId?: string;
  actorName?: string;
  action: string;
  entity: "project" | "service" | "user" | "lead" | "message" | "system";
  entityId?: string;
  description: string;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    actorId: { type: String, default: "" },
    actorName: { type: String, default: "System" },
    action: { type: String, required: true, trim: true, maxlength: 80 },
    entity: {
      type: String,
      enum: ["project", "service", "user", "lead", "message", "system"],
      required: true,
      index: true,
    },
    entityId: { type: String, default: "", index: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const ActivityLog = (models.ActivityLog ||
  mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema)) as Model<IActivityLog>;

export default ActivityLog;
