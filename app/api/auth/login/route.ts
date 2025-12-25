// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findUser } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt:', email);

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await findUser(email, password);

    if (!user) {
      console.log('User not found or invalid password');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('User found:', user.id);

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.Name,
        email: user.Email,
        userType: user.User_Type,
        profileImage: user.Profile_Image,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}