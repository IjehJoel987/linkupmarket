// app/debug-products/page.tsx
import { fetchServices } from '@/lib/airtable';

export default async function DebugPage() {
  const services = await fetchServices();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug: Your Airtable Products</h1>

        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-lg font-bold">Total Products: {services.length}</p>
        </div>

        {/* Category Breakdown */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['linkupfood', 'linkupgadget', 'linkupfashion', 'tradefairspecial'].map(cat => {
            const count = services.filter(s => s.fields.Category === cat).length;
            return (
              <div key={cat} className="p-4 bg-gray-100 rounded-lg">
                <p className="font-bold">{cat}</p>
                <p className="text-2xl font-bold text-purple-600">{count}</p>
              </div>
            );
          })}
        </div>

        {/* All Products Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">All Products Details:</h2>
          {services.length === 0 ? (
            <p className="text-red-600 font-bold">❌ NO PRODUCTS FOUND!</p>
          ) : (
            services.map((service: any, idx: number) => (
              <div key={idx} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                <p className="font-bold text-lg">{service.fields.Title || 'NO TITLE'}</p>
                <p className="text-sm">
                  <strong>Category:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded ${
                    service.fields.Category ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {service.fields.Category || '❌ EMPTY!'}
                  </span>
                </p>
                <p className="text-sm"><strong>Vendor:</strong> {service.fields.Vendor_Name || 'N/A'}</p>
                <p className="text-sm"><strong>Price:</strong> ₦{service.fields.Price || 'N/A'}</p>
                <p className="text-sm"><strong>ID:</strong> {service.id}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <h3 className="font-bold text-lg mb-2">💡 What to check in Airtable:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>All products must have a <strong>Category</strong> field value</li>
            <li>Category must be EXACTLY: linkupfood, linkupgadget, linkupfashion, or tradefairspecial</li>
            <li>No spaces, no caps differences - exactly as written above</li>
            <li>If a product shows "❌ EMPTY!" above, go to Airtable and add the Category</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
