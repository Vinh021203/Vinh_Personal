import { NextResponse } from 'next/server';

export async function POST() {
  return new NextResponse(null, {
    headers: {
      'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0;',
    },
  });
}
