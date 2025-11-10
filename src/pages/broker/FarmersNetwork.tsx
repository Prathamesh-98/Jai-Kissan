import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter, Phone, Mail, Crop, Star } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Farmer {
  id: string;
  name: string;
  location: string;
  crops: string[];
  rating: number;
  deals: number;
  contact: {
    phone: string;
    email: string;
  };
  lastDeal: string;
  status: 'active' | 'inactive';
}

const mockFarmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Rajesh Kumar',
    location: 'Punjab, Ludhiana',
    crops: ['Rice', 'Wheat'],
    rating: 4.8,
    deals: 15,
    contact: {
      phone: '+91 98765 43210',
      email: 'rajesh@example.com'
    },
    lastDeal: '2 days ago',
    status: 'active'
  },
  {
    id: 'f2',
    name: 'Mohan Singh',
    location: 'Haryana, Karnal',
    crops: ['Wheat', 'Barley'],
    rating: 4.5,
    deals: 12,
    contact: {
      phone: '+91 98765 43211',
      email: 'mohan@example.com'
    },
    lastDeal: '1 week ago',
    status: 'active'
  },
  {
    id: 'f3',
    name: 'Suresh Patel',
    location: 'Gujarat, Ahmedabad',
    crops: ['Cotton', 'Groundnut'],
    rating: 4.9,
    deals: 20,
    contact: {
      phone: '+91 98765 43212',
      email: 'suresh@example.com'
    },
    lastDeal: '3 days ago',
    status: 'active'
  },
  {
    id: 'f4',
    name: 'Anand Sharma',
    location: 'Uttar Pradesh, Meerut',
    crops: ['Sugarcane'],
    rating: 4.2,
    deals: 8,
    contact: {
      phone: '+91 98765 43213',
      email: 'anand@example.com'
    },
    lastDeal: '2 weeks ago',
    status: 'inactive'
  },
  {
    id: 'f5',
    name: 'Prakash Verma',
    location: 'Maharashtra, Nashik',
    crops: ['Onion', 'Tomato'],
    rating: 4.7,
    deals: 18,
    contact: {
      phone: '+91 98765 43214',
      email: 'prakash@example.com'
    },
    lastDeal: '5 days ago',
    status: 'active'
  }
];

const FarmersNetwork: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredFarmers = mockFarmers.filter(farmer => {
    const matchesSearch = 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.crops.some(crop => crop.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCrops = 
      selectedCrops.length === 0 ||
      farmer.crops.some(crop => selectedCrops.includes(crop));

    const matchesStatus =
      selectedStatus === 'all' ||
      farmer.status === selectedStatus;

    return matchesSearch && matchesCrops && matchesStatus;
  });

  const allCrops = Array.from(
    new Set(mockFarmers.flatMap(farmer => farmer.crops))
  ).sort();

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
            <h1 className="text-2xl font-semibold text-gray-900">Farmers Network</h1>
            <p className="mt-1 text-sm text-gray-500">
              Connect with farmers and manage your agricultural network
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-6">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search farmers by name, location, or crops..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="relative">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive')}
                        className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    
                    <div className="relative">
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value && !selectedCrops.includes(e.target.value)) {
                            setSelectedCrops([...selectedCrops, e.target.value]);
                          }
                        }}
                        className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                      >
                        <option value="">Filter by Crop</option>
                        {allCrops.map(crop => (
                          <option key={crop} value={crop}>{crop}</option>
                        ))}
                      </select>
                      <Crop className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>

                {selectedCrops.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedCrops.map(crop => (
                      <span
                        key={crop}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                      >
                        {crop}
                        <button
                          onClick={() => setSelectedCrops(selectedCrops.filter(c => c !== crop))}
                          className="ml-2 text-primary-600 hover:text-primary-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedCrops.length > 0 && (
                      <button
                        onClick={() => setSelectedCrops([])}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6">
              {filteredFarmers.map((farmer, index) => (
                <motion.div
                  key={farmer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPin size={16} className="mr-1" />
                              {farmer.location}
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col items-end">
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium text-gray-900">{farmer.rating}</span>
                            </div>
                            <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              farmer.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {farmer.crops.map(crop => (
                            <span
                              key={crop}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                            >
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:items-end">
                        <div className="flex items-center gap-4">
                          <a
                            href={`tel:${farmer.contact.phone}`}
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                          >
                            <Phone size={16} className="mr-1" />
                            {farmer.contact.phone}
                          </a>
                          <a
                            href={`mailto:${farmer.contact.email}`}
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                          >
                            <Mail size={16} className="mr-1" />
                            {farmer.contact.email}
                          </a>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            {farmer.deals} deals completed
                          </span>
                          <span className="text-sm text-gray-500">
                            Last deal: {farmer.lastDeal}
                          </span>
                        </div>
                        
                        <div className="mt-4">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {/* Handle contact */}}
                          >
                            Contact Farmer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredFarmers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No farmers found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FarmersNetwork;