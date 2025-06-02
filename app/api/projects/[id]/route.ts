import { connectDB } from '@/libs/mongodb';
import cloudinary from '@/libs/cloudinary';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';

function generateSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const project = await Project.findById(id);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const form = await req.formData();
  const name = form.get('name') as string;
  const client = form.get('client') as string;
  const status = form.get('status') as string;
  const tags = JSON.parse(form.get('tags') as string);
  const description = form.get('description') as string;
  const thumbnail = form.get('thumbnail') as File;

  let imagePath: string | undefined;

  if (thumbnail && thumbnail.size > 0) {
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'projects' },
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
    name,
    client,
    status,
    tags,
    description,
    slug: generateSlug(name),
  };

  if (imagePath) updateData.image = imagePath;

  const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  await Project.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}