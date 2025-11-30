import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IMessage extends Document {
  senderId: string;
  senderName: string;
  receiverId?: string;
  isAdmin?: boolean;
  content: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    receiverId: { type: String, default: null }, // 🟢 Thêm ở đây
    isAdmin: { type: Boolean, default: false }, // 🟢 Thêm ở đây
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = (models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema)) as Model<IMessage>;
export default Message;
