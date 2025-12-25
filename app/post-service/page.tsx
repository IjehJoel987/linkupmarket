// app/post-service/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, X, Camera, Sparkles, DollarSign, MessageCircle, User, ArrowLeft, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function PostServicePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    linkupPrice: '',
    vendorPrice: '',
    whatsapp: '',
    telegram: '',
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('linkup_user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Check if user can post services
    if (parsedUser.userType === 'Buyer') {
      alert('Only sellers can post services. Please update your account type.');
      router.push('/dashboard');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      handleFiles(filesArray);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`${file.name} is too large. Please choose files under 5MB.`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file.`);
        return false;
      }
      return true;
    });

    const newImages = [...images, ...validFiles].slice(0, 5); // Max 5 images
    setImages(newImages);
    
    // Create previews
    const previews = newImages.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesArray = Array.from(e.dataTransfer.files);
      handleFiles(filesArray);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      console.log('API response status:', res.status);
      console.log('API response ok:', res.ok);

      const responseText = await res.text();
      console.log('API response text:', responseText);

      if (!res.ok) {
        console.error('Server upload failed with status:', res.status);
        throw new Error(`Upload failed: ${res.status} ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid response format: ${responseText}`);
      }

      console.log('Server upload success:', data);
      return data.url;
    } catch (error) {
      console.error('Error uploading via server:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images to Cloudinary
      let imageUrls: string[] = [];
      if (images.length > 0) {
        console.log('Starting upload of', images.length, 'images');
        setUploadingImages(true);
        imageUrls = await Promise.all(images.map(img => uploadToCloudinary(img)));
        setUploadingImages(false);
        console.log('Uploaded image URLs:', imageUrls);
      }

      // Create service data
      const serviceData = {
        name: user.name,
        title: formData.title,
        description: formData.description,
        linkupPrice: parseFloat(formData.linkupPrice),
        vendorPrice: formData.vendorPrice ? parseFloat(formData.vendorPrice) : null,
        whatsapp: formData.whatsapp,
        telegram: formData.telegram,
        images: imageUrls,
      };

      console.log('Sending service data to API:', serviceData);

      const res = await fetch('/api/services/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      if (res.ok) {
        setShowSuccessModal(true);
        // Don't redirect immediately, let user see the modal
      } else {
        alert('Failed to post service. Please try again.');
      }
    } catch (error) {
      console.error('Error posting service:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-pulse-glow w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-gray-700">Loading your creative space...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step === 1 && <Sparkles className="w-5 h-5" />}
                {step === 2 && <Camera className="w-5 h-5" />}
                {step === 3 && <CheckCircle className="w-5 h-5" />}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                  step < currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            {currentStep === 1 && "✨ Tell us about your service"}
            {currentStep === 2 && "📸 Show off your work"}
            {currentStep === 3 && "📞 Connect with customers"}
          </h1>
          <p className="text-gray-600">
            {currentStep === 1 && "Let's make your service shine!"}
            {currentStep === 2 && "Upload stunning photos to attract buyers"}
            {currentStep === 3 && "Add your contact details"}
          </p>
        </div>
      </div>

      {/* Multi-Step Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">

          {/* Step 1: Service Details */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Details</h2>
                <p className="text-gray-600">Tell us about what you offer</p>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Professional Logo Design, Photography Services"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Describe your service in detail. What makes you unique? What results can customers expect?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>

                {/* Prices */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      LinkUp Price (₦) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="linkupPrice"
                        value={formData.linkupPrice}
                        onChange={handleChange}
                        required
                        placeholder="5000"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all duration-200"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Price customers pay on LinkUp</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Original Price (₦) - Optional
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="vendorPrice"
                        value={formData.vendorPrice}
                        onChange={handleChange}
                        placeholder="8000"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all duration-200"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Show savings to attract customers</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={nextStep}
                  disabled={!formData.title || !formData.description || !formData.linkupPrice}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Add Photos →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Images */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Camera className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Show Your Work</h2>
                <p className="text-gray-600">Upload high-quality photos to showcase your services</p>
              </div>

              {/* Drag & Drop Upload Area */}
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Drag & drop your images here
                </h3>
                <p className="text-gray-500 mb-4">
                  or click to browse files (max 5 images, 5MB each)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 cursor-pointer"
                >
                  Choose Files
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {imagePreviews.length} image{imagePreviews.length !== 1 ? 's' : ''} selected
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <button
                  onClick={prevStep}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Next: Contact Info →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <MessageCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Information</h2>
                <p className="text-gray-600">How can customers reach you?</p>
              </div>

              <div className="max-w-md mx-auto space-y-6">
                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="2348012345678"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all duration-200"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Include country code (e.g., 234 for Nigeria)</p>
                </div>

                {/* Telegram */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telegram Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleChange}
                      placeholder="@yourusername"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all duration-200"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Optional, but recommended for faster communication</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">ℹ</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Privacy Note</h4>
                    <p className="text-sm text-blue-700">
                      Your contact information will only be shared with customers who purchase your services.
                      We take your privacy seriously.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={prevStep}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || uploadingImages}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImages
                    ? 'Uploading Images...'
                    : loading
                      ? 'Posting Service...'
                      : '🚀 Post My Service'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Submitted! 🎉</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Due to security reasons, LinkUp is verifying your service/business. 
              Please check back in 5 minutes to see if it's live on the marketplace.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/dashboard');
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Browse Marketplace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}