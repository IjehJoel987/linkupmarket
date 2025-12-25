// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Store,
  DollarSign,
  Eye,
  MessageCircle,
  Plus,
  BarChart3,
  LogOut,
  Sparkles,
  Target,
  Camera,
  Star,
  Edit,
  Trash2,
  User,
  Settings
} from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('linkup_user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Fetch user's services
    fetchServices(parsedUser.name);
  }, [router]);

  const fetchServices = async (userName: string) => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        // Filter services by user name
        const userServices = data.records.filter((record: any) => record.fields.Name === userName);
        setServices(userServices);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Service deleted successfully!');
        // Refresh services
        fetchServices(user.name);
      } else {
        alert('Failed to delete service. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleEditService = (serviceId: string) => {
    // Placeholder for edit functionality
    alert('Edit service feature coming soon! For now, you can delete and repost.');
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone and will delete all your services.')) {
      return;
    }

    // Implement account deletion - for now, just logout
    localStorage.removeItem('linkup_user');
    alert('Account deleted successfully.');
    router.push('/');
  };

  const handleEditAccount = () => {
    // Implement account edit - for now, placeholder
    alert('Account edit feature coming soon!');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-pulse-glow w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-gray-700">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome to your Dashboard! 🎉</h1>
                <p className="text-purple-100">Manage your services and track your success</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          {/* Main Actions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/post-service">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 card-hover group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Post New Service</h3>
                      <p className="text-gray-600 text-sm">Add a new listing to attract customers</p>
                    </div>
                  </div>
                  <div className="text-purple-600 font-semibold text-sm">Get started →</div>
                </div>
              </Link>

              <Link href="/">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 card-hover group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Store className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Browse Marketplace</h3>
                      <p className="text-gray-600 text-sm">Explore services and get inspired</p>
                    </div>
                  </div>
                  <div className="text-blue-600 font-semibold text-sm">Explore now →</div>
                </div>
              </Link>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 card-hover group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">View Analytics</h3>
                    <p className="text-gray-600 text-sm">Track your performance and growth</p>
                  </div>
                </div>
                <div className="text-green-600 font-semibold text-sm">Coming soon →</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 card-hover group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Customer Messages</h3>
                    <p className="text-gray-600 text-sm">Respond to inquiries and reviews</p>
                  </div>
                </div>
                <div className="text-orange-600 font-semibold text-sm">in app chat coming soon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Services</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-pulse text-gray-600">Loading your services...</div>
            </div>
          ) : services.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
              <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No services yet</h3>
              <p className="text-gray-500 mb-6">Start by posting your first service to attract customers.</p>
              <Link href="/post-service">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                  Post Your First Service
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden card-hover">
                  {service.fields.Works && service.fields.Works.split('\n')[0] && (
                    <img
                      src={service.fields.Works.split('\n')[0]}
                      alt={service.fields.Title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{service.fields.Title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.fields.Description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-purple-600">₦{service.fields.Price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{service.fields.Total_Rating || 0}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditService(service.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Management */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gray-100 rounded-2xl">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Account Management</h2>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleEditAccount}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Edit Account</h3>
                <p className="text-sm text-gray-600">Update your profile information</p>
              </div>
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div className="p-3 bg-red-100 rounded-2xl">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Delete Account</h3>
                <p className="text-sm text-gray-600">Permanently delete your account</p>
              </div>
            </button>
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Tips to Boost Your Success</h2>
              <p className="text-gray-600">Quick ways to improve your listings and attract more customers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Add High-Quality Photos</h3>
              <p className="text-sm text-gray-600">Listings with multiple photos get 3x more views</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Respond Quickly</h3>
              <p className="text-sm text-gray-600">Reply within 1 hour to increase booking rates</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Collect Reviews</h3>
              <p className="text-sm text-gray-600">5-star reviews boost your visibility in search</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}