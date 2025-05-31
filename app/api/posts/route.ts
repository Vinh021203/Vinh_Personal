import { connectDB } from '@/libs/mongodb';
import Post from '@/models/Post';
import cloudinary from '@/libs/cloudinary';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const posts = await Post.find({});
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await connectDB();
  const form = await req.formData();

  const title = form.get('title') as string;
  const content = form.get('content') as string;
  const tags = JSON.parse(form.get('tags') as string);
  const slug = form.get('slug') as string;
  const author = form.get('author') as string;
  const date = form.get('date') as string;
  const thumbnail = form.get('thumbnail') as File;

  let imagePath = '';
  if (thumbnail && thumbnail.size > 0) {
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'posts' }, (error, result) => {
        if (error || !result) reject(error);
        else resolve(result);
      });
      stream.end(buffer);
    });

    imagePath = uploadResult.secure_url;
  }

  const newPost = new Post({
    title,
    slug,
    content,
    tags,
    author,
    date,
    thumbnail: imagePath,
  });

  await newPost.save();
  return NextResponse.json(newPost, { status: 201 });
}
