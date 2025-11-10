import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Search, Filter, Droplets, Sun, Sprout, Scissors, ChevronDown, ChevronUp, MapPin, Clock, Thermometer, CloudRain, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useLocation } from '../../contexts/LocationContext';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

interface CropVariety {
  name: string;
  duration: string;
  yield: string;
  characteristics: string[];
  sowingMonths: number[];
  harvestMonths: number[];
  regions: string[];
}

interface Task {
  day: number;
  task: string;
  description: string;
  type: 'irrigation' | 'fertilization' | 'pest_control' | 'general';
  icon: React.ReactNode;
}

interface CropData {
  name: string;
  varieties: CropVariety[];
  soilTypes: string[];
  season: string;
  duration: string;
  sowingWindow: {
    start: number; // month number
    end: number;   // month number
  };
  harvestWindow: {
    start: number; // month number
    end: number;   // month number
  };
  tasks: Task[];
  climateRequirements: {
    temperature: { min: number; max: number };
    rainfall: { min: number; max: number };
    humidity: { min: number; max: number };
  };
  marketPrice: {
    min: number;
    max: number;
    unit: string;
  };
  profitability: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface RegionalData {
  [state: string]: {
    climate: {
      temperature: { min: number; max: number };
      rainfall: number;
      humidity: number;
    };
    soilTypes: string[];
    majorCrops: string[];
  };
}

const CropCalendar: React.FC = () => {
  const { t } = useTranslation();
  const { currentLocation } = useLocation();
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedVariety, setSelectedVariety] = useState<string>('');
  const [selectedSoil, setSelectedSoil] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [showTimeline, setShowTimeline] = useState<boolean>(false);
  const [filterBySeason, setFilterBySeason] = useState<string>('all');

  // Regional climate and soil data
  const regionalData: RegionalData = {
    'Punjab': {
      climate: { temperature: { min: 5, max: 45 }, rainfall: 600, humidity: 65 },
      soilTypes: ['Alluvial', 'Clay Loam', 'Sandy Loam'],
      majorCrops: ['rice', 'wheat', 'cotton', 'maize', 'sugarcane']
    },
    'Haryana': {
      climate: { temperature: { min: 3, max: 47 }, rainfall: 450, humidity: 60 },
      soilTypes: ['Alluvial', 'Sandy', 'Clay'],
      majorCrops: ['wheat', 'rice', 'mustard', 'cotton', 'bajra']
    },
    'Uttar Pradesh': {
      climate: { temperature: { min: 8, max: 44 }, rainfall: 800, humidity: 70 },
      soilTypes: ['Alluvial', 'Clay', 'Loamy'],
      majorCrops: ['wheat', 'rice', 'sugarcane', 'potato', 'pea']
    },
    'Maharashtra': {
      climate: { temperature: { min: 12, max: 42 }, rainfall: 1200, humidity: 75 },
      soilTypes: ['Black Cotton', 'Red', 'Laterite'],
      majorCrops: ['cotton', 'soybean', 'onion', 'sugarcane', 'jowar']
    },
    'Karnataka': {
      climate: { temperature: { min: 15, max: 35 }, rainfall: 1400, humidity: 80 },
      soilTypes: ['Red', 'Black', 'Laterite'],
      majorCrops: ['rice', 'ragi', 'coffee', 'cotton', 'groundnut']
    },
    'Gujarat': {
      climate: { temperature: { min: 10, max: 46 }, rainfall: 500, humidity: 55 },
      soilTypes: ['Black Cotton', 'Sandy', 'Alluvial'],
      majorCrops: ['cotton', 'groundnut', 'castor', 'wheat', 'bajra']
    },
    'Rajasthan': {
      climate: { temperature: { min: 2, max: 50 }, rainfall: 300, humidity: 45 },
      soilTypes: ['Sandy', 'Arid', 'Desert'],
      majorCrops: ['mustard', 'gram', 'wheat', 'barley', 'bajra']
    },
    'Madhya Pradesh': {
      climate: { temperature: { min: 8, max: 45 }, rainfall: 1000, humidity: 65 },
      soilTypes: ['Black Cotton', 'Red', 'Alluvial'],
      majorCrops: ['soybean', 'wheat', 'gram', 'cotton', 'rice']
    },
    'West Bengal': {
      climate: { temperature: { min: 15, max: 38 }, rainfall: 1600, humidity: 85 },
      soilTypes: ['Alluvial', 'Clay', 'Laterite'],
      majorCrops: ['rice', 'jute', 'potato', 'tea', 'wheat']
    },
    'Andhra Pradesh': {
      climate: { temperature: { min: 18, max: 42 }, rainfall: 900, humidity: 75 },
      soilTypes: ['Red', 'Black', 'Alluvial'],
      majorCrops: ['rice', 'cotton', 'chilli', 'groundnut', 'tobacco']
    },
    'Tamil Nadu': {
      climate: { temperature: { min: 20, max: 40 }, rainfall: 1000, humidity: 80 },
      soilTypes: ['Red', 'Black', 'Alluvial'],
      majorCrops: ['rice', 'cotton', 'sugarcane', 'groundnut', 'millets']
    },
    'Kerala': {
      climate: { temperature: { min: 22, max: 35 }, rainfall: 2500, humidity: 85 },
      soilTypes: ['Laterite', 'Alluvial', 'Forest'],
      majorCrops: ['rice', 'coconut', 'rubber', 'spices', 'tea']
    }
  };

  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Comprehensive crop data with regional and seasonal information
  const cropData: Record<string, CropData> = {
    rice: {
      name: 'Rice',
      varieties: [
        { 
          name: 'Basmati 370', 
          duration: '120-130 days', 
          yield: '4-5 tons/ha', 
          characteristics: ['Aromatic', 'Long grain', 'Premium quality'],
          sowingMonths: [6, 7],
          harvestMonths: [10, 11],
          regions: ['Punjab', 'Haryana', 'Uttar Pradesh']
        },
        { 
          name: 'IR-64', 
          duration: '115-125 days', 
          yield: '5-6 tons/ha', 
          characteristics: ['High yielding', 'Disease resistant', 'Medium grain'],
          sowingMonths: [6, 7, 8],
          harvestMonths: [10, 11, 12],
          regions: ['West Bengal', 'Uttar Pradesh', 'Bihar']
        },
        { 
          name: 'Sona Masuri', 
          duration: '120-125 days', 
          yield: '4.5-5.5 tons/ha', 
          characteristics: ['Medium grain', 'Good cooking quality', 'Popular variety'],
          sowingMonths: [6, 7],
          harvestMonths: [10, 11],
          regions: ['Andhra Pradesh', 'Karnataka', 'Tamil Nadu']
        },
        { 
          name: 'Pusa Basmati 1121', 
          duration: '135-140 days', 
          yield: '4-5 tons/ha', 
          characteristics: ['Extra long grain', 'Export quality', 'Aromatic'],
          sowingMonths: [6, 7],
          harvestMonths: [11, 12],
          regions: ['Punjab', 'Haryana', 'Western Uttar Pradesh']
        }
      ],
      soilTypes: ['Clay', 'Clay Loam', 'Silty Clay', 'Alluvial', 'Black Cotton'],
      season: 'Kharif',
      duration: '110-140 days',
      sowingWindow: { start: 6, end: 8 },
      harvestWindow: { start: 10, end: 12 },
      climateRequirements: {
        temperature: { min: 20, max: 35 },
        rainfall: { min: 1000, max: 2000 },
        humidity: { min: 70, max: 90 }
      },
      marketPrice: { min: 2800, max: 3800, unit: 'quintal' },
      profitability: 'high',
      difficulty: 'medium',
      tasks: [
        { day: 1, task: 'Land Preparation', description: 'Deep plowing and leveling of field', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 15, task: 'Seed Treatment', description: 'Treat seeds with fungicide and soak for 24 hours', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 20, task: 'Transplanting', description: 'Transplant 25-30 day old seedlings', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 25, task: 'First Irrigation', description: 'Maintain 2-3 cm water level', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 35, task: 'First Fertilization', description: 'Apply NPK (120:60:40 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 45, task: 'Weeding', description: 'Manual or chemical weed control', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 60, task: 'Second Fertilization', description: 'Apply Urea (60 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 75, task: 'Pest Monitoring', description: 'Check for stem borer and leaf folder', type: 'pest_control', icon: <Search className="w-4 h-4" /> },
        { day: 90, task: 'Panicle Initiation', description: 'Monitor for panicle emergence', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 120, task: 'Harvest', description: 'Harvest when 80% grains are golden yellow', type: 'general', icon: <Scissors className="w-4 h-4" /> }
      ]
    },
    wheat: {
      name: 'Wheat',
      varieties: [
        { 
          name: 'HD-2967', 
          duration: '135-140 days', 
          yield: '4.5-5.5 tons/ha', 
          characteristics: ['High yielding', 'Disease resistant', 'Good quality'],
          sowingMonths: [11, 12],
          harvestMonths: [4, 5],
          regions: ['Punjab', 'Haryana', 'Uttar Pradesh']
        },
        { 
          name: 'PBW-343', 
          duration: '140-145 days', 
          yield: '5-6 tons/ha', 
          characteristics: ['High protein', 'Rust resistant', 'Popular variety'],
          sowingMonths: [11, 12],
          harvestMonths: [4, 5],
          regions: ['Punjab', 'Haryana']
        },
        { 
          name: 'WH-147', 
          duration: '130-135 days', 
          yield: '4-5 tons/ha', 
          characteristics: ['Early maturing', 'Drought tolerant', 'Good chapati quality'],
          sowingMonths: [11, 12, 1],
          harvestMonths: [3, 4],
          regions: ['Rajasthan', 'Gujarat', 'Madhya Pradesh']
        }
      ],
      soilTypes: ['Loamy', 'Clay Loam', 'Sandy Loam', 'Alluvial', 'Black'],
      season: 'Rabi',
      duration: '130-145 days',
      sowingWindow: { start: 11, end: 1 },
      harvestWindow: { start: 3, end: 5 },
      climateRequirements: {
        temperature: { min: 10, max: 25 },
        rainfall: { min: 400, max: 800 },
        humidity: { min: 50, max: 70 }
      },
      marketPrice: { min: 1900, max: 2200, unit: 'quintal' },
      profitability: 'medium',
      difficulty: 'easy',
      tasks: [
        { day: 1, task: 'Land Preparation', description: 'Deep plowing and field preparation', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 10, task: 'Seed Treatment', description: 'Treat seeds with fungicide', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 15, task: 'Sowing', description: 'Sow seeds at 100-120 kg/ha seed rate', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 20, task: 'First Irrigation', description: 'Light irrigation for germination', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 30, task: 'First Fertilization', description: 'Apply NPK (120:60:40 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 45, task: 'Second Irrigation', description: 'Crown root irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 60, task: 'Top Dressing', description: 'Apply Urea (60 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 75, task: 'Third Irrigation', description: 'Tillering stage irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 90, task: 'Fourth Irrigation', description: 'Jointing stage irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 105, task: 'Fifth Irrigation', description: 'Flowering stage irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 120, task: 'Sixth Irrigation', description: 'Grain filling irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 140, task: 'Harvest', description: 'Harvest when grains are hard and golden', type: 'general', icon: <Scissors className="w-4 h-4" /> }
      ]
    },
    cotton: {
      name: 'Cotton',
      varieties: [
        { 
          name: 'Bt Cotton RCH-134', 
          duration: '150-160 days', 
          yield: '15-20 quintals/ha', 
          characteristics: ['Bollworm resistant', 'High yielding', 'Good fiber quality'],
          sowingMonths: [5, 6],
          harvestMonths: [10, 11, 12],
          regions: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka']
        },
        { 
          name: 'Shankar-6', 
          duration: '145-155 days', 
          yield: '12-18 quintals/ha', 
          characteristics: ['Disease resistant', 'Medium staple', 'Popular hybrid'],
          sowingMonths: [5, 6, 7],
          harvestMonths: [10, 11, 12],
          regions: ['Punjab', 'Haryana', 'Rajasthan']
        }
      ],
      soilTypes: ['Black Cotton', 'Clay Loam', 'Sandy Loam', 'Red', 'Alluvial'],
      season: 'Kharif',
      duration: '140-160 days',
      sowingWindow: { start: 5, end: 7 },
      harvestWindow: { start: 10, end: 1 },
      climateRequirements: {
        temperature: { min: 21, max: 35 },
        rainfall: { min: 500, max: 1200 },
        humidity: { min: 60, max: 80 }
      },
      marketPrice: { min: 5500, max: 6200, unit: 'quintal' },
      profitability: 'high',
      difficulty: 'hard',
      tasks: [
        { day: 1, task: 'Land Preparation', description: 'Deep summer plowing and field preparation', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 15, task: 'Seed Treatment', description: 'Treat seeds with fungicide and insecticide', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 20, task: 'Sowing', description: 'Sow seeds at 1.5-2 kg/ha seed rate', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 25, task: 'First Irrigation', description: 'Light irrigation for germination', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 35, task: 'Thinning', description: 'Maintain plant population of 1-1.5 lakh/ha', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 45, task: 'First Fertilization', description: 'Apply NPK (80:40:40 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 60, task: 'Second Irrigation', description: 'Square formation stage irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 75, task: 'Top Dressing', description: 'Apply Urea (40 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 90, task: 'Flowering Stage', description: 'Monitor for pink bollworm and whitefly', type: 'pest_control', icon: <Search className="w-4 h-4" /> },
        { day: 120, task: 'Boll Development', description: 'Regular irrigation and pest monitoring', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 150, task: 'First Picking', description: 'Start picking when bolls are fully opened', type: 'general', icon: <Scissors className="w-4 h-4" /> }
      ]
    },
    sugarcane: {
      name: 'Sugarcane',
      varieties: [
        { 
          name: 'Co-0238', 
          duration: '10-12 months', 
          yield: '80-100 tons/ha', 
          characteristics: ['High sugar content', 'Disease resistant', 'Good ratoon'],
          sowingMonths: [2, 3, 10, 11],
          harvestMonths: [12, 1, 2, 3],
          regions: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu']
        },
        { 
          name: 'CoH-160', 
          duration: '10-12 months', 
          yield: '85-105 tons/ha', 
          characteristics: ['High yielding', 'Good juice quality', 'Drought tolerant'],
          sowingMonths: [2, 3, 10, 11],
          harvestMonths: [12, 1, 2, 3],
          regions: ['Haryana', 'Punjab', 'Uttar Pradesh']
        }
      ],
      soilTypes: ['Clay Loam', 'Sandy Loam', 'Alluvial', 'Black', 'Red Loam'],
      season: 'Year-round',
      duration: '10-13 months',
      sowingWindow: { start: 2, end: 4 },
      harvestWindow: { start: 12, end: 3 },
      climateRequirements: {
        temperature: { min: 20, max: 35 },
        rainfall: { min: 1000, max: 1500 },
        humidity: { min: 70, max: 85 }
      },
      marketPrice: { min: 300, max: 350, unit: 'quintal' },
      profitability: 'medium',
      difficulty: 'medium',
      tasks: [
        { day: 1, task: 'Land Preparation', description: 'Deep plowing and furrow making', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 15, task: 'Seed Treatment', description: 'Treat setts with fungicide', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 20, task: 'Planting', description: 'Plant 3-budded setts in furrows', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 30, task: 'First Irrigation', description: 'Light irrigation for sprouting', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 45, task: 'Gap Filling', description: 'Replace missing plants', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 60, task: 'First Fertilization', description: 'Apply NPK (150:75:75 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 90, task: 'Earthing Up', description: 'First earthing up operation', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 120, task: 'Second Fertilization', description: 'Apply Urea (100 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 180, task: 'Second Earthing Up', description: 'Final earthing up', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 300, task: 'Harvest', description: 'Harvest when sugar content is maximum', type: 'general', icon: <Scissors className="w-4 h-4" /> }
      ]
    },
    maize: {
      name: 'Maize',
      varieties: [
        { 
          name: 'HQPM-1', 
          duration: '90-100 days', 
          yield: '5-6 tons/ha', 
          characteristics: ['High protein', 'Quality protein maize', 'Nutritious'],
          sowingMonths: [6, 7, 11, 12],
          harvestMonths: [9, 10, 3, 4],
          regions: ['Karnataka', 'Andhra Pradesh', 'Bihar']
        },
        { 
          name: 'Pioneer-30V92', 
          duration: '85-95 days', 
          yield: '6-7 tons/ha', 
          characteristics: ['High yielding', 'Disease resistant', 'Good grain quality'],
          sowingMonths: [6, 7, 11, 12],
          harvestMonths: [9, 10, 3, 4],
          regions: ['Punjab', 'Haryana', 'Uttar Pradesh']
        }
      ],
      soilTypes: ['Loamy', 'Sandy Loam', 'Clay Loam', 'Alluvial', 'Red'],
      season: 'Kharif/Rabi',
      duration: '85-105 days',
      sowingWindow: { start: 6, end: 7 },
      harvestWindow: { start: 9, end: 10 },
      climateRequirements: {
        temperature: { min: 18, max: 35 },
        rainfall: { min: 500, max: 1200 },
        humidity: { min: 60, max: 80 }
      },
      marketPrice: { min: 1800, max: 2000, unit: 'quintal' },
      profitability: 'medium',
      difficulty: 'easy',
      tasks: [
        { day: 1, task: 'Land Preparation', description: 'Deep plowing and field preparation', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 10, task: 'Seed Treatment', description: 'Treat seeds with fungicide', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 15, task: 'Sowing', description: 'Sow seeds at 20-25 kg/ha seed rate', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 20, task: 'First Irrigation', description: 'Light irrigation for germination', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 30, task: 'First Fertilization', description: 'Apply NPK (120:60:40 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 35, task: 'Thinning', description: 'Maintain proper plant population', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 45, task: 'Second Irrigation', description: 'Knee-high stage irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 60, task: 'Top Dressing', description: 'Apply Urea (60 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 75, task: 'Third Irrigation', description: 'Tasseling stage irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 90, task: 'Harvest', description: 'Harvest when grains are hard and dry', type: 'general', icon: <Scissors className="w-4 h-4" /> }
      ]
    },
    soybean: {
      name: 'Soybean',
      varieties: [
        { 
          name: 'JS-335', 
          duration: '95-100 days', 
          yield: '2.5-3 tons/ha', 
          characteristics: ['High protein', 'Disease resistant', 'Popular variety'],
          sowingMonths: [6, 7],
          harvestMonths: [9, 10],
          regions: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan']
        },
        { 
          name: 'MACS-450', 
          duration: '90-95 days', 
          yield: '2-2.5 tons/ha', 
          characteristics: ['Early maturing', 'Drought tolerant', 'Good oil content'],
          sowingMonths: [6, 7],
          harvestMonths: [9, 10],
          regions: ['Maharashtra', 'Karnataka']
        }
      ],
      soilTypes: ['Clay Loam', 'Sandy Loam', 'Black', 'Red', 'Alluvial'],
      season: 'Kharif',
      duration: '90-105 days',
      sowingWindow: { start: 6, end: 7 },
      harvestWindow: { start: 9, end: 10 },
      climateRequirements: {
        temperature: { min: 20, max: 30 },
        rainfall: { min: 450, max: 700 },
        humidity: { min: 65, max: 75 }
      },
      marketPrice: { min: 3800, max: 4200, unit: 'quintal' },
      profitability: 'high',
      difficulty: 'medium',
      tasks: [
        { day: 1, task: 'Land Preparation', description: 'Deep plowing and field preparation', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 10, task: 'Seed Treatment', description: 'Treat seeds with rhizobium and fungicide', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 15, task: 'Sowing', description: 'Sow seeds at 75-80 kg/ha seed rate', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 25, task: 'First Irrigation', description: 'Light irrigation if needed', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 35, task: 'First Fertilization', description: 'Apply NPK (20:60:40 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 45, task: 'Weeding', description: 'Manual or chemical weed control', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 60, task: 'Flowering Stage', description: 'Monitor for pod borer and defoliators', type: 'pest_control', icon: <Search className="w-4 h-4" /> },
        { day: 75, task: 'Pod Filling', description: 'Ensure adequate moisture', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 95, task: 'Harvest', description: 'Harvest when pods are brown and dry', type: 'general', icon: <Scissors className="w-4 h-4" /> }
      ]
    },
    groundnut: {
      name: 'Groundnut',
      varieties: [
        { 
          name: 'TMV-2', 
          duration: '110-120 days', 
          yield: '2.5-3 tons/ha', 
          characteristics: ['High oil content', 'Disease resistant', 'Popular variety'],
          sowingMonths: [6, 7],
          harvestMonths: [10, 11],
          regions: ['Tamil Nadu', 'Andhra Pradesh', 'Karnataka']
        },
        { 
          name: 'JL-24', 
          duration: '100-110 days', 
          yield: '2-2.5 tons/ha', 
          characteristics: ['Early maturing', 'Drought tolerant', 'Good kernel quality'],
          sowingMonths: [6, 7],
          harvestMonths: [9, 10],
          regions: ['Gujarat', 'Rajasthan']
        }
      ],
      soilTypes: ['Sandy Loam', 'Red', 'Black', 'Alluvial'],
      season: 'Kharif',
      duration: '100-120 days',
      sowingWindow: { start: 6, end: 7 },
      harvestWindow: { start: 9, end: 11 },
      climateRequirements: {
        temperature: { min: 20, max: 30 },
        rainfall: { min: 500, max: 750 },
        humidity: { min: 60, max: 70 }
      },
      marketPrice: { min: 5000, max: 5500, unit: 'quintal' },
      profitability: 'high',
      difficulty: 'medium',
      tasks: [
        { day: 1, task: 'Land Preparation', description: 'Deep plowing and ridging', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 10, task: 'Seed Treatment', description: 'Treat seeds with rhizobium and fungicide', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 15, task: 'Sowing', description: 'Sow seeds at 100-120 kg/ha seed rate', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 25, task: 'First Irrigation', description: 'Light irrigation if needed', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 35, task: 'First Fertilization', description: 'Apply NPK (20:40:40 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 45, task: 'Weeding', description: 'Manual or chemical weed control', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 60, task: 'Flowering Stage', description: 'Monitor for thrips and aphids', type: 'pest_control', icon: <Search className="w-4 h-4" /> },
        { day: 75, task: 'Pegging Stage', description: 'Ensure adequate soil moisture', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 110, task: 'Harvest', description: 'Harvest when leaves turn yellow', type: 'general', icon: <Scissors className="w-4 h-4" /> }
      ]
    },
    mustard: {
      name: 'Mustard',
      varieties: [
        { 
          name: 'Pusa Bold', 
          duration: '130-140 days', 
          yield: '1.5-2 tons/ha', 
          characteristics: ['High oil content', 'Cold tolerant', 'Popular variety'],
          sowingMonths: [10, 11],
          harvestMonths: [3, 4],
          regions: ['Rajasthan', 'Haryana', 'Uttar Pradesh']
        },
        { 
          name: 'Kranti', 
          duration: '125-135 days', 
          yield: '1.2-1.8 tons/ha', 
          characteristics: ['Disease resistant', 'Good oil quality', 'Aphid tolerant'],
          sowingMonths: [10, 11],
          harvestMonths: [3, 4],
          regions: ['Madhya Pradesh', 'Gujarat']
        }
      ],
      soilTypes: ['Loamy', 'Clay Loam', 'Sandy Loam', 'Alluvial'],
      season: 'Rabi',
      duration: '125-140 days',
      sowingWindow: { start: 10, end: 11 },
      harvestWindow: { start: 3, end: 4 },
      climateRequirements: {
        temperature: { min: 10, max: 25 },
        rainfall: { min: 400, max: 600 },
        humidity: { min: 50, max: 70 }
      },
      marketPrice: { min: 4500, max: 5000, unit: 'quintal' },
      profitability: 'medium',
      difficulty: 'easy',
      tasks: [
        { day: 1, task: 'Land Preparation', description: 'Fine tilth preparation', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 10, task: 'Seed Treatment', description: 'Treat seeds with fungicide', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 15, task: 'Sowing', description: 'Line sowing at 3-4 kg/ha seed rate', type: 'general', icon: <Sprout className="w-4 h-4" /> },
        { day: 25, task: 'First Irrigation', description: 'Light irrigation for germination', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 35, task: 'First Fertilization', description: 'Apply NPK (60:30:30 kg/ha)', type: 'fertilization', icon: <Sun className="w-4 h-4" /> },
        { day: 50, task: 'Second Irrigation', description: 'Rosette stage irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 70, task: 'Third Irrigation', description: 'Flowering stage irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 90, task: 'Fourth Irrigation', description: 'Pod filling irrigation', type: 'irrigation', icon: <Droplets className="w-4 h-4" /> },
        { day: 135, task: 'Harvest', description: 'Harvest when pods turn brown', type: 'general', icon: <Scissors className="w-4 h-4" /> }
      ]
    }
  };

  const soilTypes = [
    'Clay', 'Clay Loam', 'Sandy', 'Sandy Loam', 'Loamy', 'Silty Loam', 'Silt', 
    'Silty Clay', 'Peat', 'Chalk', 'Black', 'Black Cotton', 'Red', 'Red Loam', 
    'Alluvial', 'Laterite', 'Saline', 'Alkaline', 'Acidic', 'Calcareous', 'Vertisol',
    'Entisol', 'Inceptisol', 'Alfisol', 'Ultisol', 'Oxisol', 'Mollisol', 'Spodosol',
    'Aridisol', 'Gelisol', 'Histosol'
  ];

  const filteredCrops = Object.entries(cropData).filter(([key, crop]) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterBySeason === 'all' || crop.season.toLowerCase().includes(filterBySeason.toLowerCase()))
  );

  const toggleTaskExpansion = (taskIndex: number) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskIndex)) {
      newExpanded.delete(taskIndex);
    } else {
      newExpanded.add(taskIndex);
    }
    setExpandedTasks(newExpanded);
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'irrigation': return 'text-blue-600 bg-blue-50';
      case 'fertilization': return 'text-green-600 bg-green-50';
      case 'pest_control': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Get suitable crops for current month and location
  const getSuitableCrops = () => {
    if (!currentLocation?.state) return [];
    
    const stateData = regionalData[currentLocation.state];
    if (!stateData) return [];

    return Object.entries(cropData).filter(([key, crop]) => {
      // Check if crop is suitable for the region
      const isRegionSuitable = crop.varieties.some(variety => 
        variety.regions.includes(currentLocation.state)
      );
      
      // Check if current month is suitable for sowing
      const isSowingSeason = currentMonth >= crop.sowingWindow.start && 
                            currentMonth <= crop.sowingWindow.end;
      
      // Check climate compatibility
      const isClimateCompatible = 
        stateData.climate.temperature.min >= crop.climateRequirements.temperature.min - 5 &&
        stateData.climate.temperature.max <= crop.climateRequirements.temperature.max + 5 &&
        stateData.climate.rainfall >= crop.climateRequirements.rainfall.min - 200;

      return isRegionSuitable && isSowingSeason && isClimateCompatible;
    });
  };

  const suitableCrops = getSuitableCrops();

  // Get crop timeline for visualization
  const getCropTimeline = () => {
    return Object.entries(cropData).map(([key, crop]) => ({
      key,
      name: crop.name,
      sowingStart: crop.sowingWindow.start,
      sowingEnd: crop.sowingWindow.end,
      harvestStart: crop.harvestWindow.start,
      harvestEnd: crop.harvestWindow.end,
      season: crop.season,
      profitability: crop.profitability,
      difficulty: crop.difficulty
    }));
  };

  const cropTimeline = getCropTimeline();

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-500" />;
      case 'hard': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navbar variant="dashboard" />
      
      <main className="pt-20 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🌾 Smart Crop Calendar & Guidance
            </h1>
          </div>
          <p className="text-gray-600">
            Complete farming roadmap with regional guidance and intelligent crop suggestions
          </p>
          {currentLocation && (
            <div className="flex items-center gap-2 mt-2 text-sm text-green-700">
              <MapPin size={16} />
              <span>{currentLocation.district}, {currentLocation.state}</span>
              <span className="mx-2">•</span>
              <Clock size={16} />
              <span>Current Month: {monthNames[currentMonth - 1]}</span>
            </div>
          )}
        </div>

        {/* What to Plant This Month */}
        {showSuggestions && currentLocation && suitableCrops.length > 0 && (
          <Card className="mb-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                  🌱 What to Plant This Month in {currentLocation.state}?
                </h2>
                <p className="text-green-700 mb-4">
                  Based on your location, climate, and current month ({monthNames[currentMonth - 1]}), here are the recommended crops:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suitableCrops.map(([key, crop]) => (
                    <div key={key} className="bg-white/80 rounded-lg p-4 border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-2">{crop.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Thermometer size={14} className="text-orange-500" />
                          <span>Temp: {crop.climateRequirements.temperature.min}°C - {crop.climateRequirements.temperature.max}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CloudRain size={14} className="text-blue-500" />
                          <span>Rainfall: {crop.climateRequirements.rainfall.min}-{crop.climateRequirements.rainfall.max}mm</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gray-500" />
                          <span>Duration: {crop.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp size={14} className="text-green-500" />
                          <span className={`px-2 py-1 rounded-full text-xs ${getProfitabilityColor(crop.profitability)}`}>
                            {crop.profitability} profit
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getDifficultyIcon(crop.difficulty)}
                          <span className="text-sm">{crop.difficulty} to grow</span>
                        </div>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => {
                            setSelectedCrop(key);
                            setShowSuggestions(false);
                          }}
                          className="mt-2 w-full"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-green-600 hover:text-green-800 p-1"
              >
                ×
              </button>
            </div>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="mb-8 p-6 bg-white/80 backdrop-blur-sm border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Crops</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop</label>
              <select
                value={selectedCrop}
                onChange={(e) => {
                  setSelectedCrop(e.target.value);
                  setSelectedVariety('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Choose crop...</option>
                {filteredCrops.map(([key, crop]) => (
                  <option key={key} value={key}>{crop.name}</option>
                ))}
              </select>
            </div>

            {selectedCrop && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Variety</label>
                <select
                  value={selectedVariety}
                  onChange={(e) => setSelectedVariety(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Choose variety...</option>
                  {cropData[selectedCrop]?.varieties.map((variety, index) => (
                    <option key={index} value={variety.name}>{variety.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
              <select
                value={selectedSoil}
                onChange={(e) => setSelectedSoil(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Choose soil type...</option>
                {soilTypes.map((soil) => (
                  <option key={soil} value={soil}>{soil}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Season Filter</label>
              <select
                value={filterBySeason}
                onChange={(e) => setFilterBySeason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Seasons</option>
                <option value="kharif">Kharif</option>
                <option value="rabi">Rabi</option>
                <option value="year-round">Year-round</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex gap-4">
            <Button
              variant={showTimeline ? "primary" : "outline"}
              onClick={() => setShowTimeline(!showTimeline)}
            >
              {showTimeline ? "Hide" : "Show"} Crop Timeline
            </Button>
          </div>
        </Card>

        {/* Crop Timeline Visualization */}
        {showTimeline && (
          <Card className="mb-8 p-6 bg-white/90 backdrop-blur-sm border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-6">📅 Annual Crop Timeline</h3>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Month headers */}
                <div className="grid grid-cols-12 gap-1 mb-4">
                  {monthNames.map((month, index) => (
                    <div key={index} className={`text-center text-xs font-medium p-2 rounded ${
                      index + 1 === currentMonth ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {month.slice(0, 3)}
                    </div>
                  ))}
                </div>
                
                {/* Crop timeline bars */}
                <div className="space-y-3">
                  {cropTimeline.map((crop) => (
                    <div key={crop.key} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-700 truncate">
                        {crop.name}
                      </div>
                      <div className="flex-1 grid grid-cols-12 gap-1">
                        {Array.from({ length: 12 }, (_, monthIndex) => {
                          const month = monthIndex + 1;
                          const isSowing = month >= crop.sowingStart && month <= crop.sowingEnd;
                          const isHarvest = month >= crop.harvestStart && month <= crop.harvestEnd;
                          const isGrowing = !isSowing && !isHarvest && (
                            (crop.sowingEnd < crop.harvestStart && month > crop.sowingEnd && month < crop.harvestStart) ||
                            (crop.sowingEnd > crop.harvestStart && (month > crop.sowingEnd || month < crop.harvestStart))
                          );
                          
                          return (
                            <div
                              key={month}
                              className={`h-6 rounded text-xs flex items-center justify-center ${
                                isSowing ? 'bg-blue-200 text-blue-800' :
                                isGrowing ? 'bg-green-200 text-green-800' :
                                isHarvest ? 'bg-orange-200 text-orange-800' :
                                'bg-gray-50'
                              }`}
                              title={
                                isSowing ? 'Sowing' :
                                isGrowing ? 'Growing' :
                                isHarvest ? 'Harvest' : ''
                              }
                            >
                              {isSowing ? 'S' : isGrowing ? 'G' : isHarvest ? 'H' : ''}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getProfitabilityColor(crop.profitability)}`}>
                          {crop.profitability}
                        </span>
                        {getDifficultyIcon(crop.difficulty)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-200 rounded"></div>
                    <span>Sowing (S)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                    <span>Growing (G)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-200 rounded"></div>
                    <span>Harvest (H)</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Crop Information */}
        {selectedCrop && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Crop Details */}
            <Card className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">🌱 Crop Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-green-700">Crop:</span>
                  <span className="ml-2 text-gray-700">{cropData[selectedCrop].name}</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Season:</span>
                  <span className="ml-2 text-gray-700">{cropData[selectedCrop].season}</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Duration:</span>
                  <span className="ml-2 text-gray-700">{cropData[selectedCrop].duration}</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Sowing Window:</span>
                  <span className="ml-2 text-gray-700">
                    {monthNames[cropData[selectedCrop].sowingWindow.start - 1]} - {monthNames[cropData[selectedCrop].sowingWindow.end - 1]}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Harvest Window:</span>
                  <span className="ml-2 text-gray-700">
                    {monthNames[cropData[selectedCrop].harvestWindow.start - 1]} - {monthNames[cropData[selectedCrop].harvestWindow.end - 1]}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Market Price:</span>
                  <span className="ml-2 text-gray-700">
                    ₹{cropData[selectedCrop].marketPrice.min} - ₹{cropData[selectedCrop].marketPrice.max} per {cropData[selectedCrop].marketPrice.unit}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-medium text-green-700">Profitability:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getProfitabilityColor(cropData[selectedCrop].profitability)}`}>
                      {cropData[selectedCrop].profitability}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-green-700">Difficulty:</span>
                    {getDifficultyIcon(cropData[selectedCrop].difficulty)}
                    <span className="text-gray-700">{cropData[selectedCrop].difficulty}</span>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-green-700">Suitable Regions:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Array.from(new Set(cropData[selectedCrop].varieties.flatMap(v => v.regions))).map((region) => (
                      <span
                        key={region}
                        className={`px-2 py-1 rounded-full text-xs ${
                          currentLocation?.state === region
                            ? 'bg-green-600 text-white'
                            : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-green-700">Suitable Soils:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cropData[selectedCrop].soilTypes.map((soil) => (
                      <span
                        key={soil}
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedSoil === soil
                            ? 'bg-green-600 text-white'
                            : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {soil}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Climate Requirements */}
            <Card className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">🌤️ Climate Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  <div>
                    <span className="font-medium text-blue-700">Temperature:</span>
                    <p className="text-sm text-gray-700">
                      {cropData[selectedCrop].climateRequirements.temperature.min}°C - {cropData[selectedCrop].climateRequirements.temperature.max}°C
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CloudRain className="w-5 h-5 text-blue-500" />
                  <div>
                    <span className="font-medium text-blue-700">Rainfall:</span>
                    <p className="text-sm text-gray-700">
                      {cropData[selectedCrop].climateRequirements.rainfall.min} - {cropData[selectedCrop].climateRequirements.rainfall.max} mm
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-cyan-500" />
                  <div>
                    <span className="font-medium text-blue-700">Humidity:</span>
                    <p className="text-sm text-gray-700">
                      {cropData[selectedCrop].climateRequirements.humidity.min}% - {cropData[selectedCrop].climateRequirements.humidity.max}%
                    </p>
                  </div>
                </div>
                {currentLocation?.state && regionalData[currentLocation.state] && (
                  <div className="mt-4 p-3 bg-white/60 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">Your Region Climate:</h4>
                    <div className="text-sm space-y-1">
                      <p>Temperature: {regionalData[currentLocation.state].climate.temperature.min}°C - {regionalData[currentLocation.state].climate.temperature.max}°C</p>
                      <p>Rainfall: {regionalData[currentLocation.state].climate.rainfall}mm</p>
                      <p>Humidity: {regionalData[currentLocation.state].climate.humidity}%</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Variety Information */}
            {selectedVariety && (
              <Card className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200">
                <h3 className="text-xl font-bold text-amber-800 mb-4">🌾 Variety Details</h3>
                {(() => {
                  const variety = cropData[selectedCrop].varieties.find(v => v.name === selectedVariety);
                  return variety ? (
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-amber-700">Variety:</span>
                        <span className="ml-2 text-gray-700">{variety.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-amber-700">Duration:</span>
                        <span className="ml-2 text-gray-700">{variety.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium text-amber-700">Expected Yield:</span>
                        <span className="ml-2 text-gray-700">{variety.yield}</span>
                      </div>
                      <div>
                        <span className="font-medium text-amber-700">Sowing Months:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {variety.sowingMonths.map((month) => (
                            <span
                              key={month}
                              className={`px-2 py-1 rounded-full text-xs ${
                                month === currentMonth
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-amber-200 text-amber-800'
                              }`}
                            >
                              {monthNames[month - 1]}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-amber-700">Harvest Months:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {variety.harvestMonths.map((month) => (
                            <span
                              key={month}
                              className="px-2 py-1 rounded-full text-xs bg-amber-200 text-amber-800"
                            >
                              {monthNames[month - 1]}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-amber-700">Characteristics:</span>
                        <div className="mt-2 space-y-1">
                          {variety.characteristics.map((char, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{char}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </Card>
            )}
          </div>
        )}

        {/* Detailed Roadmap */}
        {selectedCrop && (
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-6">🗺️ Detailed Farming Roadmap</h3>
            <div className="space-y-4">
              {cropData[selectedCrop].tasks.map((task, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleTaskExpansion(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${getTaskTypeColor(task.type)}`}>
                            {task.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              Day {task.day}: {task.task}
                            </div>
                            <div className="text-sm text-gray-600 capitalize">
                              {task.type.replace('_', ' ')} Task
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Day {task.day}</span>
                        {expandedTasks.has(index) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedTasks.has(index) && (
                    <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                      <div className="pt-4">
                        <p className="text-gray-700 leading-relaxed">{task.description}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskTypeColor(task.type)}`}>
                            {task.type.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            Recommended timing: Day {task.day} from sowing
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* No Crop Selected */}
        {!selectedCrop && (
          <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-green-200">
            <Calendar className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Select a Crop to Get Started</h3>
            <p className="text-gray-500 mb-4">
              Choose a crop from the dropdown above to view detailed farming calendar and roadmap
            </p>
            {!showSuggestions && suitableCrops.length > 0 && (
              <Button
                variant="primary"
                onClick={() => setShowSuggestions(true)}
                className="mt-4"
              >
                Show Crop Suggestions for This Month
              </Button>
            )}
          </Card>
        )}
      </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CropCalendar;