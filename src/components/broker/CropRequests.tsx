import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLocation } from '../../contexts/LocationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CropRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerContact: {
    phone: string;
    email: string;
  };
  location: {
    district: string;
    state: string;
  };
  crop: {
    name: string;
    variety: string;
    quantity: number;
    price: number;
  };
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

const CropRequests: React.FC = () => {
  const { currentLocation } = useLocation();
  const [requests, setRequests] = useState<CropRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Here you would fetch requests from your backend based on broker's location
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        // Mock data
        setRequests([
          {
            id: '1',
            farmerId: 'f1',
            farmerName: 'Rajesh Kumar',
            farmerContact: {
              phone: '+91 9876543210',
              email: 'rajesh@example.com'
            },
            location: {
              district: 'Ludhiana',
              state: 'Punjab'
            },
            crop: {
              name: 'Wheat',
              variety: 'HD-2967',
              quantity: 100,
              price: 2200
            },
            status: 'pending',
            createdAt: new Date().toISOString()
          },
          // Add more mock requests
        ]);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentLocation) {
      fetchRequests();
    }
  }, [currentLocation]);

  const handleAccept = async (requestId: string) => {
    // Handle accept logic
  };

  const handleReject = async (requestId: string) => {
    // Handle reject logic
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Crop Sale Requests</h2>
      
      {requests.map((request, index) => (
        <motion.div
          key={request.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {request.crop.name} - {request.crop.variety}
                </h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    Quantity: {request.crop.quantity} quintals
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ₹{request.crop.price}/quintal
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    {request.location.district}, {request.location.state}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{request.farmerName}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-end text-sm text-gray-600">
                    <Phone size={14} className="mr-1" />
                    {request.farmerContact.phone}
                  </div>
                  <div className="flex items-center justify-end text-sm text-gray-600">
                    <Mail size={14} className="mr-1" />
                    {request.farmerContact.email}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => handleReject(request.id)}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                onClick={() => handleAccept(request.id)}
              >
                Accept
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CropRequests;