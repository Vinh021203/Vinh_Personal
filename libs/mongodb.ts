import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('❌ Thiếu biến môi trường MONGODB_URI trong .env.local');
}

// ✅ Tạo cache kết nối tránh reconnect nhiều lần
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // Cho phép request kế tiếp kết nối lại thay vì giữ promise đã rejected
    // cho đến khi phải restart dev server.
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}
