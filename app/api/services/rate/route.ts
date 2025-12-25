// app/api/services/rate/route.ts
import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const SERVICES_TABLE = "Talent";

export async function POST(request: NextRequest) {
  try {
    const { serviceId, rating } = await request.json();

    // Validate input
    if (!serviceId || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid service ID or rating (must be 1-5)' },
        { status: 400 }
      );
    }

    console.log('Rating submission:', { serviceId, rating });

    // First, get the current service data
    const getUrl = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}/${serviceId}`;
    const getResponse = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
      },
    });

    if (!getResponse.ok) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const serviceData = await getResponse.json();
    const fields = serviceData.fields;

    // Parse existing reviews data
    let reviewsData = [];
    try {
      reviewsData = JSON.parse(fields.Reviews_Data || '[]');
    } catch (error) {
      console.warn('Failed to parse reviews data, starting fresh');
      reviewsData = [];
    }

    // Add new rating to reviews
    reviewsData.push({
      rating,
      timestamp: new Date().toISOString(),
    });

    // Calculate new average rating
    const totalRating = reviewsData.reduce((sum: number, review: any) => sum + review.rating, 0);
    const newAverageRating = totalRating / reviewsData.length;

    // Update service with new rating data
    const updateData = {
      fields: {
        Reviews_Data: JSON.stringify(reviewsData),
        Total_Rating: Math.round(newAverageRating * 10) / 10, // Round to 1 decimal
        Review_Count: reviewsData.length,
      },
    };

    const updateUrl = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}/${serviceId}`;
    const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('Failed to update rating:', errorText);
      return NextResponse.json(
        { error: 'Failed to update rating' },
        { status: 500 }
      );
    }

    const updatedService = await updateResponse.json();
    console.log('Rating updated successfully:', updatedService.fields.Total_Rating);

    return NextResponse.json({
      success: true,
      newRating: updatedService.fields.Total_Rating,
      reviewCount: updatedService.fields.Review_Count,
    });

  } catch (error) {
    console.error('Rating error:', error);
    return NextResponse.json(
      { error: 'Rating failed. Please try again.' },
      { status: 500 }
    );
  }
}