import { connectDB } from '@/libs/mongodb';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const service = await Service.findById(id);
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const form = await req.formData();

  const name = form.get('name') as string;
  const description = form.get('description') as string;
  const icon = form.get('icon') as string;
  const status = form.get('status') as 'Hiển thị' | 'Ẩn';

  const updated = await Service.findByIdAndUpdate(
    id,
    { name, description, icon, status },
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  await Service.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}