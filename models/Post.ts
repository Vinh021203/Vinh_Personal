import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  tags: string[];
  date?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  thumbnail?: string;
  author?: string;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tags: [String],
    date: String,
    excerpt: String,
    content: String,
    image: String,
    thumbnail: String,
    author: String,
  },
  { timestamps: true }
);

// Kiểu rõ ràng: Model<IPost>
const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
export default Post;
