import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, Edit2, Camera, Save, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const BrokerProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    company: 'AgriTrade Solutions',
    licenseNumber: 'BRK123456789',
    experience: '8 years',
    preferredLanguage: 'English',
    specialization: ['Rice', 'Wheat', 'Cotton'],
    operatingMarkets: ['Punjab Mandi', 'Haryana Mandi'],
    bankDetails: {
      accountHolder: currentUser?.name || '',
      accountNumber: 'XXXX-XXXX-5678',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0123456'
    },
    businessMetrics: {
      totalTransactions: 156,
      activeContracts: 12,
      farmerNetwork: 45,
      averageRating: 4.8
    }
  });

  const handleSave = () => {
    // In a real app, this would make an API call to update the profile
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="dashboard" />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 size={18} />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-secondary-100 flex items-center justify-center">
                      <User className="h-12 w-12 text-secondary-600" />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                      <Camera size={16} className="text-gray-600" />
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-gray-900">{profileData.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Building size={14} />
                    {profileData.company}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} />
                    {profileData.location}
                  </p>
                  <div className="mt-4 w-full space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} />
                      {profileData.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} />
                      {profileData.email}
                    </div>
                  </div>
                  
                  <div className="mt-6 w-full">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Rating</p>
                        <p className="text-lg font-semibold text-gray-900">{profileData.businessMetrics.averageRating}/5</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Farmers</p>
                        <p className="text-lg font-semibold text-gray-900">{profileData.businessMetrics.farmerNetwork}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Business Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">License Number</label>
                        <p className="mt-1 text-sm text-gray-900">{profileData.licenseNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Experience</label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={profileData.experience}
                            onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                            fullWidth
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profileData.experience}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Specialization</label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={profileData.specialization.join(', ')}
                            onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value.split(', ') })}
                            fullWidth
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profileData.specialization.join(', ')}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Operating Markets</label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={profileData.operatingMarkets.join(', ')}
                            onChange={(e) => setProfileData({ ...profileData, operatingMarkets: e.target.value.split(', ') })}
                            fullWidth
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profileData.operatingMarkets.join(', ')}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                        {isEditing ? (
                          <select
                            value={profileData.preferredLanguage}
                            onChange={(e) => setProfileData({ ...profileData, preferredLanguage: e.target.value })}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          >
                            <option value="English">English</option>
                            <option value="Hindi">हिंदी</option>
                            <option value="Marathi">मराठी</option>
                          </select>
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{profileData.preferredLanguage}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Business Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Total Transactions</p>
                        <p className="text-xl font-semibold text-gray-900">{profileData.businessMetrics.totalTransactions}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Active Contracts</p>
                        <p className="text-xl font-semibold text-gray-900">{profileData.businessMetrics.activeContracts}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Farmer Network</p>
                        <p className="text-xl font-semibold text-gray-900">{profileData.businessMetrics.farmerNetwork}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Average Rating</p>
                        <p className="text-xl font-semibold text-gray-900">{profileData.businessMetrics.averageRating}/5</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Account Holder</label>
                        <p className="mt-1 text-sm text-gray-900">{profileData.bankDetails.accountHolder}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Account Number</label>
                        <p className="mt-1 text-sm text-gray-900">{profileData.bankDetails.accountNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                        <p className="mt-1 text-sm text-gray-900">{profileData.bankDetails.bankName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                        <p className="mt-1 text-sm text-gray-900">{profileData.bankDetails.ifscCode}</p>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrokerProfile;