// app/api/dashboard/route.ts
import { connectDB } from '@/libs/mongodb';
import Project from '@/models/Project';
import Post from '@/models/Post';
import Message from '@/models/Message';
import User from '@/models/User'; // cần có User schema

import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const [projects, posts, messages, users] = await Promise.all([
    Project.countDocuments(),
    Post.countDocuments(),
    Message.countDocuments(),
    User.countDocuments(),
  ]);

  return NextResponse.json({ projects, posts, messages, users });
}
