import { connectDB } from '@/libs/mongodb';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  await connectDB();
  const form = await req.formData();

  const name = form.get('name') as string;
  const description = form.get('description') as string;
  const icon = form.get('icon') as string;
  const status = form.get('status') as 'Hiển thị' | 'Ẩn';

  const newService = new Service({ name, description, icon, status });
  await newService.save();
  return NextResponse.json(newService, { status: 201 });
}
