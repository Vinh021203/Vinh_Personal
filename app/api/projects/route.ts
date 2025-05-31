import { connectDB } from '@/libs/mongodb';
import cloudinary from '@/libs/cloudinary';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

function generateSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // loại ký tự đặc biệt
    .replace(/\s+/g, '-') // thay khoảng trắng bằng -
    .replace(/-+/g, '-'); // bỏ dư dấu -
}

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await connectDB();
  const form = await req.formData();

  const name = form.get('name') as string;
  const client = form.get('client') as string;
  const status = form.get('status') as string;
  const tags = JSON.parse(form.get('tags') as string);
  const description = form.get('description') as string;
  const thumbnail = form.get('thumbnail') as File;

  let imagePath = '';

  if (thumbnail && thumbnail.size > 0) {
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'projects' }, (error, result) => {
        if (error || !result) reject(error);
        else resolve(result);
      });
      stream.end(buffer);
    });

    imagePath = uploadResult.secure_url;

  }
  const newProject = new Project({
    name,
    client,
    slug: generateSlug(name),
    status,
    tags,
    description,
    image: imagePath,
  });

  await newProject.save();
  return NextResponse.json(newProject, { status: 201 });
}
