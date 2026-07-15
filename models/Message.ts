import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface IMessage extends Document {
  senderId: string;
  senderName: string;
  receiverId?: string | null;
  isAdmin?: boolean;
  content: string;
  read?: boolean;
  status?: "sent" | "delivered" | "read";
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: { type: String, required: true, index: true },
    senderName: { type: String, required: true },
    receiverId: { type: String, default: null, index: true },
    isAdmin: { type: Boolean, default: false, index: true },
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    read: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true },
);

const Message = (models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema)) as Model<IMessage>;

export default Message;
