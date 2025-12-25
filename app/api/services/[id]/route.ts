// app/api/services/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const SERVICES_TABLE = "Talent";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}/${id}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_PAT}`,
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });
  
  if (!res.ok) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }
  
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { title, description, linkupPrice, vendorPrice, whatsapp, telegram, images } = await request.json();

    const serviceData = {
      fields: {
        Title: title,
        Description: description,
        Price: parseFloat(linkupPrice),
        Vendor_Price: vendorPrice ? parseFloat(vendorPrice) : null,
        Contact: whatsapp || '',
        Telegram_Username: telegram || '',
        Works: images && images.length > 0 ? images.join('\n') : '',
      },
    };

    const url = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}/${id}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: 'Failed to update service', details: errorText },
        { status: 400 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, service: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Update failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: 'Failed to delete service', details: errorText },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Delete failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}