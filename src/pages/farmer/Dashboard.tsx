import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Droplets, Wind, ThermometerSun, MapPin, X, ArrowUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../contexts/LocationContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import WeatherCard from '../../components/dashboard/WeatherCard';
import CropPriceCard from '../../components/dashboard/CropPriceCard';
import SellCropForm from '../../components/farmer/SellCropForm';
import CropNewsCard from '../../components/dashboard/CropNewsCard';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { currentLocation, updateLocation, error } = useLocation();
  const [showSellForm, setShowSellForm] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const modal = (e.target as HTMLElement).querySelector('#sell-form-modal');
      if (modal) {
        setShowScrollTop(modal.scrollTop > 300);
      }
    };

    const modal = document.querySelector('#sell-form-modal');
    if (modal) {
      modal.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (modal) {
        modal.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showSellForm]);

  const scrollToTop = () => {
    const modal = document.querySelector('#sell-form-modal');
    if (modal) {
      modal.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 via-primary-50 to-secondary-50 bg-field-pattern">
      <Navbar variant="dashboard" />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-farming border border-primary-100">
              <div>
                <h1 className="text-3xl font-bold bg-farming-gradient bg-clip-text text-transparent">
                  {getGreeting()}, {currentUser?.name}
                </h1>
                <div className="mt-2 flex items-center text-sm text-primary-700">
                  <MapPin size={16} className="mr-1 text-primary-600" />
                  {currentLocation ? (
                    `${currentLocation.district}, ${currentLocation.state}`
                  ) : (
                    <Button
                      variant="text"
                      size="sm"
                      onClick={handleLocationUpdate}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Enable location access
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <Button
                  variant="primary"
                  onClick={() => setShowSellForm(true)}
                  className="bg-farming-gradient hover:shadow-farming transform hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold shadow-lg"
                >
                  🌾 Sell Your Crop
                </Button>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-bounce-gentle"></div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">🌤️ Today's Weather</p>
                    <p className="mt-1 text-xl font-semibold text-blue-900">Partly Cloudy</p>
                  </div>
                  <div className="p-3 bg-blue-200 rounded-full animate-bounce-gentle">
                    <ThermometerSun className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-blue-900">28°C</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-cyan-600">💧 Humidity</p>
                    <p className="mt-1 text-xl font-semibold text-cyan-900">Moderate</p>
                  </div>
                  <div className="p-3 bg-cyan-200 rounded-full animate-bounce-gentle">
                    <Droplets className="h-6 w-6 text-cyan-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-cyan-900">65%</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-600">🌬️ Wind Speed</p>
                    <p className="mt-1 text-xl font-semibold text-emerald-900">Light Breeze</p>
                  </div>
                  <div className="p-3 bg-emerald-200 rounded-full animate-bounce-gentle">
                    <Wind className="h-6 w-6 text-emerald-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-emerald-900">12 km/h</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600">📅 Upcoming Activity</p>
                    <p className="mt-1 text-xl font-semibold text-amber-900">Rice Planting</p>
                  </div>
                  <div className="p-3 bg-amber-200 rounded-full animate-bounce-gentle">
                    <Calendar className="h-6 w-6 text-amber-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-amber-700 font-medium">Optimal conditions in 3 days</p>
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
              <WeatherCard />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CropPriceCard compact />
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
        </div>
      </main>
      
      <AnimatePresence>
        {showSellForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              id="sell-form-modal"
            >
              <button
                onClick={() => setShowSellForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <X size={24} />
              </button>
              <SellCropForm />

              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
                  >
                    <ArrowUp size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Dashboard;