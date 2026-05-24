// app/debug-airtable/page.tsx
import { fetchServices } from '@/lib/airtable';

export default async function DebugAirtable() {
  const services = await fetchServices();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-red-600">🚨 Airtable Debug</h1>

        <div className="mb-8 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
          <p className="text-lg font-bold text-red-900">Total Products: {services.length}</p>
        </div>

        {services.length === 0 ? (
          <p className="text-red-600 font-bold">❌ NO PRODUCTS FOUND!</p>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">First 3 Products (All Fields):</h2>
            {services.slice(0, 3).map((service: any, idx: number) => (
              <div key={idx} className="p-6 border-2 border-gray-300 rounded-lg bg-gray-50 overflow-auto">
                <p className="font-bold text-lg mb-4">Product {idx + 1}: {service.fields.Title || 'NO TITLE'}</p>
                <div className="bg-white p-4 rounded font-mono text-sm whitespace-pre-wrap break-words">
                  {JSON.stringify(service.fields, null, 2)}
                </div>
              </div>
            ))}

            <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-500 rounded-lg">
              <h3 className="font-bold text-lg mb-4">📋 What you need to do:</h3>
              <ol className="list-decimal list-inside space-y-3 text-sm">
                <li>Look at the product data above</li>
                <li>Check if <strong>"Category"</strong> field exists - if not, go to Airtable and CREATE it</li>
                <li>Make sure it's a <strong>"Single Select"</strong> field type in Airtable</li>
                <li>For EVERY product, set Category to ONE of these values:
                  <ul className="list-disc list-inside ml-4 mt-2 font-mono">
                    <li>linkupfood</li>
                    <li>linkupgadget</li>
                    <li>linkupfashion</li>
                    <li>tradefairspecial</li>
                  </ul>
                </li>
                <li>Refresh this page - you should see the Category field populated</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
