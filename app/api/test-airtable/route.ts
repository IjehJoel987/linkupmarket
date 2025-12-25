// app/api/test-airtable/route.ts
import { NextResponse } from 'next/server';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT!;
const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const SERVICES_TABLE = process.env.AIRTABLE_SERVICES_TABLE!;

export async function GET() {
  try {
    // Test fetching services
    const servicesUrl = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}`;
    const servicesRes = await fetch(servicesUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
    });

    const servicesData = await servicesRes.json();

    // Test fetching users
    const usersUrl = `https://api.airtable.com/v0/${BASE_ID}/User%20table`;
    const usersRes = await fetch(usersUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
    });

    const usersData = await usersRes.json();

    return NextResponse.json({
      services: {
        success: servicesRes.ok,
        count: servicesData.records?.length || 0,
        error: servicesRes.ok ? null : servicesData,
        records: servicesData.records?.slice(0, 2) // First 2 records
      },
      users: {
        success: usersRes.ok,
        count: usersData.records?.length || 0,
        error: usersRes.ok ? null : usersData,
        records: usersData.records?.slice(0, 2) // First 2 records
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}