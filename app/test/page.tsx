// app/test/page.tsx
'use client';

import { useState } from 'react';

export default function TestPage() {
  const [signupResult, setSignupResult] = useState<any>(null);
  const [serviceResult, setServiceResult] = useState<any>(null);
  const [airtableTest, setAirtableTest] = useState<any>(null);

  const testSignup = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'testpass123',
          userType: 'student'
        })
      });
      const data = await response.json();
      setSignupResult(data);
    } catch (error) {
      setSignupResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const testServiceCreation = async () => {
    try {
      const response = await fetch('/api/services/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Service',
          title: 'Test Title',
          description: 'Test Description',
          linkupPrice: 50,
          vendorPrice: 40,
          whatsapp: '+1234567890',
          telegram: '@testuser',
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
        })
      });
      const data = await response.json();
      setServiceResult(data);
    } catch (error) {
      setServiceResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const testAirtable = async () => {
    try {
      const response = await fetch('/api/test-airtable');
      const data = await response.json();
      setAirtableTest(data);
    } catch (error) {
      setAirtableTest({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">API Test Page</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Test Airtable Connection</h2>
          <button
            onClick={testAirtable}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Airtable
          </button>
          {airtableTest && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(airtableTest, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Test User Signup</h2>
          <button
            onClick={testSignup}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Signup
          </button>
          {signupResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(signupResult, null, 2)}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Test Service Creation</h2>
          <button
            onClick={testServiceCreation}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Test Service Creation
          </button>
          {serviceResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(serviceResult, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}