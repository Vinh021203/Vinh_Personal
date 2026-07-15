import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface IMessage extends Document {
  conversationId: string;
  senderId: string;
  senderName: string;
  senderEmail?: string;
  receiverId?: string | null;
  isAdmin?: boolean;
  content: string;
  attachments?: string[];
  read?: boolean;
  deliveredAt?: Date;
  readAt?: Date;
  status?: "sent" | "delivered" | "read";
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: String, required: true, index: true },
    senderId: { type: String, required: true, index: true },
    senderName: { type: String, required: true, trim: true },
    senderEmail: { type: String, default: "", trim: true, lowercase: true },
    receiverId: { type: String, default: null, index: true },
    isAdmin: { type: Boolean, default: false, index: true },
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    attachments: { type: [String], default: [] },
    read: { type: Boolean, default: false, index: true },
    deliveredAt: { type: Date },
    readAt: { type: Date },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
      index: true,
    },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

MessageSchema.index({ conversationId: 1, createdAt: 1 });
MessageSchema.index({ read: 1, isAdmin: 1, createdAt: -1 });

const Message = (models.Message || mongoose.model<IMessage>("Message", MessageSchema)) as Model<IMessage>;

export default Message;
