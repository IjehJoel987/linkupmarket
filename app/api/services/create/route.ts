// app/api/services/create/route.ts
import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const SERVICES_TABLE = "Talent";

export async function POST(request: NextRequest) {
  try {
    const { name, title, description, linkupPrice, vendorPrice, whatsapp, telegram, images } = await request.json();

    console.log('Service creation request:', {
      name, title, description, linkupPrice, vendorPrice, images: images?.length
    });

    // Validate required fields
    if (!name || !title || !description || !linkupPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create service data
    const serviceData = {
      fields: {
        Name: name,
        Title: title,
        Description: description,
        Price: parseFloat(linkupPrice),
        Vendor_Price: vendorPrice ? parseFloat(vendorPrice) : null,
        Contact: whatsapp || '',
        Telegram_Username: telegram || '',
        Works: images && images.length > 0 ? images.join('\n') : '',
        Reviews_Data: '[]',
        Total_Rating: 0,
        Review_Count: 0,
        Verified: false,
      },
    };

    console.log('Sending to Airtable:', JSON.stringify(serviceData, null, 2));

    const url = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}`;
    console.log('Airtable URL:', url);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    });

    console.log('Service creation response status:', res.status);
    const responseText = await res.text();
    console.log('Service creation response:', responseText);

    if (!res.ok) {
      console.error('Airtable error:', responseText);
      return NextResponse.json(
        { error: 'Failed to create service', details: responseText },
        { status: 400 }
      );
    }

    const data = JSON.parse(responseText);
    console.log('Service created successfully:', data.id);
    
    return NextResponse.json({ 
      success: true, 
      service: data,
      message: 'Service posted successfully!' 
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { 
        error: 'Service creation failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}