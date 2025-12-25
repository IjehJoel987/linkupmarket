// lib/airtable.ts

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const USERS_TABLE = "User%20table"; // URL encoded
const SERVICES_TABLE = "Talent";

const headers = {
  Authorization: `Bearer ${AIRTABLE_PAT}`,
  'Content-Type': 'application/json',
};

// Fetch all users
export async function fetchUsers() {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${USERS_TABLE}`;
  
  try {
    const res = await fetch(url, { 
      headers,
      cache: 'no-store'
    });
    
    console.log('fetchUsers status:', res.status);
    
    if (res.ok) {
      const data = await res.json();
      console.log('fetchUsers count:', data.records?.length);
      return data.records;
    }
    
    const errorText = await res.text();
    console.error('fetchUsers error:', errorText);
    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Find user by email and password (optimized - direct API call)
export async function findUser(email: string, password: string) {
  const filterFormula = encodeURIComponent(`{Email} = '${email.replace(/'/g, "\\'")}'`);
  const url = `https://api.airtable.com/v0/${BASE_ID}/${USERS_TABLE}?filterByFormula=${filterFormula}`;
  
  try {
    const res = await fetch(url, { 
      headers,
      next: { revalidate: 60 } // Cache for 1 minute
    });
    
    if (res.ok) {
      const data = await res.json();
      const user = data.records?.[0];
      
      if (user && user.fields.Password === password) {
        return { id: user.id, ...user.fields };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
}

// Create or update user
export async function upsertUser(data: any, recordId?: string) {
  const url = recordId 
    ? `https://api.airtable.com/v0/${BASE_ID}/${USERS_TABLE}/${recordId}`
    : `https://api.airtable.com/v0/${BASE_ID}/${USERS_TABLE}`;
  
  const payload = { fields: data };
  
  try {
    const res = await fetch(url, {
      method: recordId ? 'PATCH' : 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    
    console.log('upsertUser status:', res.status);
    const responseText = await res.text();
    console.log('upsertUser response:', responseText);
    
    return res.ok;
  } catch (error) {
    console.error('Error upserting user:', error);
    return false;
  }
}

// Fetch all services with caching
export async function fetchServices() {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}`;
  
  try {
    const res = await fetch(url, { 
      headers,
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    console.log('fetchServices status:', res.status);
    
    if (res.ok) {
      const data = await res.json();
      console.log('fetchServices count:', data.records?.length);
      return data.records;
    }
    
    const errorText = await res.text();
    console.error('fetchServices error:', errorText);
    return [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Add review to service
export async function addReview(
  recordId: string, 
  reviewerName: string, 
  rating: number, 
  reviewText: string
) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${SERVICES_TABLE}/${recordId}`;
  
  try {
    const getRes = await fetch(url, { headers });
    if (!getRes.ok) return false;
    
    const currentData = await getRes.json();
    const fields = currentData.fields;
    
    const currentReviews = JSON.parse(fields.Reviews_Data || '[]');
    
    const newReview = {
      name: reviewerName,
      rating,
      text: reviewText,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };
    currentReviews.push(newReview);
    
    const currentTotal = fields.Total_Rating || 0;
    const currentCount = fields.Review_Count || 0;
    
    const updateData = {
      fields: {
        Reviews_Data: JSON.stringify(currentReviews),
        Total_Rating: currentTotal + rating,
        Review_Count: currentCount + 1
      }
    };
    
    const updateRes = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updateData),
    });
    
    return updateRes.ok;
  } catch (error) {
    console.error('Error adding review:', error);
    return false;
  }
}