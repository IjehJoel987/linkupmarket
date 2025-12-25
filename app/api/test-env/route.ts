// app/api/test-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
    apiSecret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET',
    allEnv: Object.keys(process.env).filter(key => key.includes('CLOUDINARY'))
  });
}