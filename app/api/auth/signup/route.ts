// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const USERS_TABLE = "User%20table"; // URL encoded

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, userType } = await request.json();

    console.log('Signup attempt:', { name, email, userType });

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create user data
    const userData = {
      Name: name,
      Email: email,
      Password: password,
      User_Type: userType || 'Buyer',
      Intent: 'Marketplace',
      Bio: '',
      Profile_Image: '',
    };

    console.log('User data prepared:', userData);

    // Save to Airtable - URL encode the table name
    const url = `https://api.airtable.com/v0/${BASE_ID}/${USERS_TABLE}`;
    console.log('Airtable URL:', url);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: userData }),
    });

    console.log('Airtable response status:', res.status);
    const responseText = await res.text();
    console.log('Airtable response:', responseText);

    if (!res.ok) {
      console.error('Airtable error:', responseText);
      return NextResponse.json(
        { error: 'Failed to create account', details: responseText },
        { status: 400 }
      );
    }

    const data = JSON.parse(responseText);
    console.log('User created in Airtable:', data.id);

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: data.id,
        name,
        email,
        userType,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Signup failed. Please try again.', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}