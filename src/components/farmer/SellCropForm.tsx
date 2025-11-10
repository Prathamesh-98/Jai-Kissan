import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '../../contexts/LocationContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Image as ImageIcon, Upload, X } from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  variety: string;
  season: string;
  minPrice: number;
  maxPrice: number;
}

const cropsList: Record<string, Crop[]> = {
  'Punjab': [
    { id: 'wheat-1', name: 'Wheat', variety: 'HD-2967', season: 'Rabi', minPrice: 2000, maxPrice: 2200 },
    { id: 'wheat-2', name: 'Wheat', variety: 'PBW-343', season: 'Rabi', minPrice: 1950, maxPrice: 2150 },
    { id: 'rice-1', name: 'Rice', variety: 'Pusa Basmati', season: 'Kharif', minPrice: 3500, maxPrice: 3800 },
    { id: 'rice-2', name: 'Rice', variety: 'PR-126', season: 'Kharif', minPrice: 2800, maxPrice: 3000 },
    { id: 'cotton-1', name: 'Cotton', variety: 'Bt Cotton', season: 'Kharif', minPrice: 5500, maxPrice: 6000 },
    { id: 'maize-1', name: 'Maize', variety: 'PMH-1', season: 'Kharif', minPrice: 1800, maxPrice: 2000 },
    { id: 'sugarcane-1', name: 'Sugarcane', variety: 'Co-0238', season: 'Year-round', minPrice: 300, maxPrice: 350 },
    { id: 'potato-3', name: 'Potato', variety: 'Kufri Pukhraj', season: 'Rabi', minPrice: 1100, maxPrice: 1300 },
    { id: 'mustard-3', name: 'Mustard', variety: 'PBR-357', season: 'Rabi', minPrice: 4700, maxPrice: 5100 }
  ],
  'Haryana': [
    { id: 'wheat-3', name: 'Wheat', variety: 'WH-1105', season: 'Rabi', minPrice: 1980, maxPrice: 2180 },
    { id: 'rice-3', name: 'Rice', variety: 'HKR-47', season: 'Kharif', minPrice: 2900, maxPrice: 3100 },
    { id: 'mustard-1', name: 'Mustard', variety: 'RH-749', season: 'Rabi', minPrice: 4500, maxPrice: 5000 },
    { id: 'cotton-2', name: 'Cotton', variety: 'H-1236', season: 'Kharif', minPrice: 5600, maxPrice: 6100 },
    { id: 'bajra-1', name: 'Pearl Millet', variety: 'HHB-67', season: 'Kharif', minPrice: 2200, maxPrice: 2400 },
    { id: 'sugarcane-3', name: 'Sugarcane', variety: 'CoH-160', season: 'Year-round', minPrice: 310, maxPrice: 360 }
  ],
  'Uttar Pradesh': [
    { id: 'wheat-4', name: 'Wheat', variety: 'PBW-502', season: 'Rabi', minPrice: 1900, maxPrice: 2100 },
    { id: 'rice-4', name: 'Rice', variety: 'MTU-7029', season: 'Kharif', minPrice: 2700, maxPrice: 2900 },
    { id: 'sugarcane-2', name: 'Sugarcane', variety: 'Co-0238', season: 'Year-round', minPrice: 300, maxPrice: 350 },
    { id: 'potato-1', name: 'Potato', variety: 'Kufri Jyoti', season: 'Rabi', minPrice: 1000, maxPrice: 1200 },
    { id: 'mentha-1', name: 'Mentha', variety: 'Kosi', season: 'Rabi', minPrice: 15000, maxPrice: 17000 },
    { id: 'pea-1', name: 'Green Pea', variety: 'Arkel', season: 'Rabi', minPrice: 2500, maxPrice: 3000 }
  ],
  'Maharashtra': [
    { id: 'cotton-3', name: 'Cotton', variety: 'Ajit-155', season: 'Kharif', minPrice: 5600, maxPrice: 6100 },
    { id: 'soybean-1', name: 'Soybean', variety: 'JS-335', season: 'Kharif', minPrice: 3800, maxPrice: 4200 },
    { id: 'turmeric-1', name: 'Turmeric', variety: 'Salem', season: 'Kharif', minPrice: 7000, maxPrice: 7500 },
    { id: 'onion-1', name: 'Onion', variety: 'Bhima Super', season: 'Rabi', minPrice: 2500, maxPrice: 2800 },
    { id: 'jowar-1', name: 'Jowar', variety: 'CSV-20', season: 'Kharif', minPrice: 2300, maxPrice: 2600 },
    { id: 'pomegranate-1', name: 'Pomegranate', variety: 'Bhagwa', season: 'Year-round', minPrice: 12000, maxPrice: 15000 }
  ],
  'Karnataka': [
    { id: 'rice-5', name: 'Rice', variety: 'Sona Masuri', season: 'Kharif', minPrice: 3200, maxPrice: 3500 },
    { id: 'ragi-1', name: 'Ragi', variety: 'ML-365', season: 'Kharif', minPrice: 2400, maxPrice: 2800 },
    { id: 'coffee-1', name: 'Coffee', variety: 'Arabica', season: 'Year-round', minPrice: 35000, maxPrice: 40000 },
    { id: 'pepper-1', name: 'Black Pepper', variety: 'Panniyur-1', season: 'Year-round', minPrice: 45000, maxPrice: 50000 },
    { id: 'cardamom-1', name: 'Cardamom', variety: 'Green Gold', season: 'Year-round', minPrice: 90000, maxPrice: 100000 },
    { id: 'areca-1', name: 'Areca Nut', variety: 'Mohitnagar', season: 'Year-round', minPrice: 25000, maxPrice: 30000 }
  ],
  'Gujarat': [
    { id: 'cotton-4', name: 'Cotton', variety: 'Shankar-6', season: 'Kharif', minPrice: 5700, maxPrice: 6200 },
    { id: 'groundnut-1', name: 'Groundnut', variety: 'GG-20', season: 'Kharif', minPrice: 5000, maxPrice: 5500 },
    { id: 'castor-1', name: 'Castor', variety: 'GCH-7', season: 'Kharif', minPrice: 4800, maxPrice: 5200 },
    { id: 'cumin-2', name: 'Cumin', variety: 'GC-4', season: 'Rabi', minPrice: 15500, maxPrice: 17500 },
    { id: 'isabgol-1', name: 'Isabgol', variety: 'GI-2', season: 'Rabi', minPrice: 12000, maxPrice: 14000 }
  ],
  'Rajasthan': [
    { id: 'mustard-2', name: 'Mustard', variety: 'NRCHB-101', season: 'Rabi', minPrice: 4600, maxPrice: 5000 },
    { id: 'gram-1', name: 'Gram', variety: 'RSG-888', season: 'Rabi', minPrice: 4800, maxPrice: 5200 },
    { id: 'cumin-1', name: 'Cumin', variety: 'GC-4', season: 'Rabi', minPrice: 15000, maxPrice: 17000 },
    { id: 'guar-1', name: 'Guar', variety: 'HG-365', season: 'Kharif', minPrice: 3500, maxPrice: 4000 },
    { id: 'moth-1', name: 'Moth Bean', variety: 'RMO-40', season: 'Kharif', minPrice: 4000, maxPrice: 4500 }
  ],
  'Madhya Pradesh': [
    { id: 'soybean-2', name: 'Soybean', variety: 'JS-9560', season: 'Kharif', minPrice: 3900, maxPrice: 4300 },
    { id: 'gram-2', name: 'Gram', variety: 'JG-11', season: 'Rabi', minPrice: 4700, maxPrice: 5100 },
    { id: 'wheat-5', name: 'Wheat', variety: 'HI-1544', season: 'Rabi', minPrice: 1950, maxPrice: 2150 },
    { id: 'masoor-1', name: 'Masoor', variety: 'JL-3', season: 'Rabi', minPrice: 4500, maxPrice: 5000 },
    { id: 'garlic-1', name: 'Garlic', variety: 'G-282', season: 'Rabi', minPrice: 8000, maxPrice: 10000 }
  ],
  'West Bengal': [
    { id: 'rice-6', name: 'Rice', variety: 'MTU-7029', season: 'Kharif', minPrice: 2800, maxPrice: 3000 },
    { id: 'jute-1', name: 'Jute', variety: 'JRO-524', season: 'Kharif', minPrice: 4000, maxPrice: 4500 },
    { id: 'potato-2', name: 'Potato', variety: 'Kufri Jyoti', season: 'Rabi', minPrice: 1100, maxPrice: 1300 },
    { id: 'tea-2', name: 'Tea', variety: 'TV-25', season: 'Year-round', minPrice: 25000, maxPrice: 30000 },
    { id: 'betel-1', name: 'Betel Leaf', variety: 'Bangla', season: 'Year-round', minPrice: 20000, maxPrice: 25000 }
  ],
  'Andhra Pradesh': [
    { id: 'rice-7', name: 'Rice', variety: 'BPT-5204', season: 'Kharif', minPrice: 2900, maxPrice: 3100 },
    { id: 'chilli-2', name: 'Red Chilli', variety: 'Teja', season: 'Kharif', minPrice: 12000, maxPrice: 15000 },
    { id: 'tobacco-1', name: 'Tobacco', variety: 'Siri', season: 'Rabi', minPrice: 14000, maxPrice: 16000 },
    { id: 'turmeric-2', name: 'Turmeric', variety: 'Duggirala', season: 'Kharif', minPrice: 7200, maxPrice: 7800 }
  ]
};

const SellCropForm: React.FC = () => {
  const { currentLocation, updateLocation } = useLocation();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCropDetails, setSelectedCropDetails] = useState<Crop | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!currentLocation) {
      updateLocation();
    }
  }, [currentLocation, updateLocation]);

  const availableCrops = currentLocation?.state 
    ? cropsList[currentLocation.state] || []
    : [];

  useEffect(() => {
    if (selectedCrop) {
      const cropDetail = availableCrops.find(crop => crop.id === selectedCrop);
      setSelectedCropDetails(cropDetail || null);
      if (cropDetail) {
        setPrice(cropDetail.minPrice.toString());
      }
    }
  }, [selectedCrop, availableCrops]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages(prev => [...prev, ...newImages]);
      
      // Create preview URLs
      const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setSelectedCrop('');
      setQuantity('');
      setPrice('');
      setDescription('');
      setImages([]);
      setVideo(null);
      setPreviewUrls([]);
      
      alert('Your crop listing has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting crop listing:', error);
      alert('Failed to submit crop listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationAccess = () => {
    if ('geolocation' in navigator) {
      updateLocation();
    }
  };

  if (!currentLocation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enable Location Access</h2>
        <p className="text-gray-600 mb-6">
          We need your location to show you relevant crop options and market prices in your area.
        </p>
        <Button
          variant="primary"
          onClick={handleLocationAccess}
        >
          Enable Location Access
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sell Your Crop</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Crop
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a crop</option>
            {availableCrops.map((crop) => (
              <option key={crop.id} value={crop.id}>
                {crop.name} - {crop.variety} ({crop.season})
              </option>
            ))}
          </select>
        </div>

        {selectedCropDetails && (
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="font-medium text-primary-800 mb-2">Current Market Price Range</h3>
            <p className="text-primary-600">
              ₹{selectedCropDetails.minPrice} - ₹{selectedCropDetails.maxPrice} per quintal
            </p>
          </div>
        )}

        <Input
          label="Quantity (in quintals)"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="1"
        />

        <Input
          label="Expected Price (per quintal)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="1"
          helperText={selectedCropDetails ? 
            `Recommended price range: ₹${selectedCropDetails.minPrice} - ₹${selectedCropDetails.maxPrice}` : 
            undefined}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Describe your crop quality, storage conditions, etc."
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images (up to 5)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                    <span>Upload images</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={images.length >= 5}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
              </div>
            </div>
          </div>

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Video (optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                    <span>Upload a video</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="video/*"
                      onChange={handleVideoUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">MP4 up to 50MB</p>
              </div>
            </div>
          </div>

          {video && (
            <div className="relative inline-block">
              <div className="p-2 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">{video.name}</p>
              </div>
              <button
                type="button"
                onClick={removeVideo}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          >
            Submit Listing
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SellCropForm;