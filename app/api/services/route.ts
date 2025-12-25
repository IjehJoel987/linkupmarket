// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { fetchServices } from '@/lib/airtable';

export async function GET() {
  try {
    const services = await fetchServices();
    return NextResponse.json({ records: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}