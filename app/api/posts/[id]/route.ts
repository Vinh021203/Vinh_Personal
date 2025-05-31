import { connectDB } from '@/libs/mongodb';
import Post from '@/models/Post';
import cloudinary from '@/libs/cloudinary';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const form = await req.formData();

  const title = form.get('title') as string;
  const content = form.get('content') as string;
  const updatedAt = form.get('updatedAt') as string;
  const thumbnail = form.get('thumbnail') as File;

  let imagePath: string | undefined;

  if (thumbnail && thumbnail.size > 0) {
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'posts' },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    imagePath = uploadResult.secure_url;
  }

  const updateData: any = {
    title,
    content,
    updatedAt,
  };

  if (imagePath) updateData.thumbnail = imagePath;

  const updatedPost = await Post.findByIdAndUpdate(params.id, updateData, { new: true });
  return NextResponse.json(updatedPost);
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();

  await connectDB();
  await Post.findByIdAndUpdate(id, { ...body }, { new: true });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  await connectDB();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
