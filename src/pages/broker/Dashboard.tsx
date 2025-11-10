import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, LineChart, BarChart3, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../contexts/LocationContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CropPriceCard from '../../components/dashboard/CropPriceCard';
import CropRequests from '../../components/broker/CropRequests';
import CropNewsCard from '../../components/dashboard/CropNewsCard';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { currentLocation, updateLocation } = useLocation();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLocationUpdate = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          updateLocation();
        },
        (error) => {
          console.error('Location error:', error);
        }
      );
    }
  };
  
  // Mock data for broker dashboard
  const farmerConnections = 24;
  const activeDeals = 8;
  const marketTrends = [
    { crop: 'Rice', trend: '+5.2%', color: 'text-success-500' },
    { crop: 'Wheat', trend: '-2.1%', color: 'text-error-500' },
    { crop: 'Cotton', trend: '+4.3%', color: 'text-success-500' },
    { crop: 'Potato', trend: '-8.7%', color: 'text-error-500' },
    { crop: 'Tomato', trend: '+12.4%', color: 'text-success-500' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-earth-50 to-primary-50 bg-field-pattern">
      <Navbar variant="dashboard" />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-earth border border-secondary-200">
              <h1 className="text-3xl font-bold bg-earth-gradient bg-clip-text text-transparent">
                🤝 {getGreeting()}, {currentUser?.name}
              </h1>
              <div className="mt-2 flex items-center text-sm text-secondary-700">
                <MapPin size={16} className="mr-1 text-secondary-600" />
                {currentLocation ? (
                  `${currentLocation.district}, ${currentLocation.state}`
                ) : (
                  <Button
                    variant="text"
                    size="sm"
                    onClick={handleLocationUpdate}
                    className="text-secondary-600 hover:text-secondary-700 font-medium"
                  >
                    Enable location access
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">👥 Farmer Connections</p>
                    <p className="mt-1 text-xl font-semibold text-green-900">Network</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-full animate-bounce-gentle">
                    <Users className="h-6 w-6 text-green-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-green-900">{farmerConnections}</p>
                  <p className="text-sm text-green-600 mt-1 font-medium">+3 this week</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">📊 Active Deals</p>
                    <p className="mt-1 text-xl font-semibold text-blue-900">Current</p>
                  </div>
                  <div className="p-3 bg-blue-200 rounded-full animate-bounce-gentle">
                    <LineChart className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-blue-900">{activeDeals}</p>
                  <p className="text-sm text-blue-600 mt-1 font-medium">Last updated: Today</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600">📈 Market Volatility</p>
                    <p className="mt-1 text-xl font-semibold text-amber-900">This Week</p>
                  </div>
                  <div className="p-3 bg-amber-200 rounded-full animate-bounce-gentle">
                    <TrendingUp className="h-6 w-6 text-amber-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-amber-900">Medium</p>
                  <div className="w-full bg-amber-200 rounded-full h-2.5 mt-2">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-600">💰 Price Change</p>
                    <p className="mt-1 text-xl font-semibold text-emerald-900">Daily Average</p>
                  </div>
                  <div className="p-3 bg-emerald-200 rounded-full animate-bounce-gentle">
                    <BarChart3 className="h-6 w-6 text-emerald-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-emerald-900">+2.4%</p>
                  <p className="text-sm text-emerald-600 mt-1 font-medium">Up from yesterday</p>
                </div>
              </Card>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CropPriceCard />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Trends</h3>
                <div className="space-y-4">
                  {marketTrends.map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span className="font-medium">{item.crop}</span>
                      <span className={`font-bold ${item.color}`}>{item.trend}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="w-full text-center text-sm font-medium text-secondary-600 hover:text-secondary-700 p-2 border border-secondary-200 rounded-md">
                    View All Market Trends
                  </button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CropNewsCard />
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Connected Farmers</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crops</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Deal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'Rajesh Kumar', location: 'Punjab', crops: 'Rice, Wheat', lastDeal: '2 days ago', status: 'Active' },
                      { name: 'Mohan Singh', location: 'Haryana', crops: 'Wheat, Barley', lastDeal: '1 week ago', status: 'Active' },
                      { name: 'Suresh Patel', location: 'Gujarat', crops: 'Cotton, Groundnut', lastDeal: '3 days ago', status: 'Active' },
                      { name: 'Anand Sharma', location: 'Uttar Pradesh', crops: 'Sugarcane', lastDeal: '2 weeks ago', status: 'Inactive' },
                    ].map((farmer, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{farmer.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{farmer.crops}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {farmer.lastDeal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            farmer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {farmer.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          <div className="mt-6">
            <CropRequests />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;