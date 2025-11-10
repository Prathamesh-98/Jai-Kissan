import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplets, Sun, TrendingUp, FileText, Clock, User, Navigation, Smartphone } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-primary-900 overflow-hidden pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <motion.h1 
                  className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="block">Better Farming</span>
                  <span className="block text-accent-400">Better Decisions</span>
                </motion.h1>
                <motion.p 
                  className="mt-3 text-base text-primary-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Get real-time crop prices, weather updates, and government scheme recommendations to make informed farming decisions.
                </motion.p>
                <motion.div 
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="rounded-md shadow">
                    <Link
                      to="/farmer/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Register as Farmer
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/broker/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Register as Broker
                    </Link>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Indian farmer working in field"
          />
        </div>
      </div>
      
      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for better farming
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides timely information and resources to help you make informed decisions about your farm.
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Crop Prices</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Get up-to-date market prices for your crops from various markets across the country to help you sell at the best rates.
                </dd>
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Weather Forecasts</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Get accurate weather predictions tailored for farming, including rainfall estimates, temperature trends, and advisories.
                </dd>
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Government Schemes</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Discover and apply for relevant government subsidies, loans, and support programs specifically for farmers.
                </dd>
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <User className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Farmer-Broker Connection</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Connect directly with trusted brokers to negotiate better deals and eliminate middlemen from the supply chain.
                </dd>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Crop Calendar</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Plan your sowing and harvesting with our seasonal crop calendar, optimized for your region and climate conditions.
                </dd>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <Navigation className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Location-Based Services</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  All information is customized to your specific location, giving you the most relevant data for your farm.
                </dd>
              </motion.div>
            </dl>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            <span className="block">Ready to revolutionize your farming?</span>
            <span className="block text-primary-300">Start using Farmer's Portal today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/farmer/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-900 bg-white hover:bg-primary-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">About Us</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Supporting farmers across India
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Farmer's Portal was created to bridge the information gap that farmers face in making critical agricultural decisions. We believe that access to timely, accurate information can transform farming practices and improve livelihoods.
              </p>
              <div className="mt-6">
                <p className="text-lg leading-7 text-gray-500">
                  Our mission is to empower farmers with data-driven insights that help them:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex">
                    <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-500">Make better crop selection decisions</span>
                  </li>
                  <li className="flex">
                    <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-500">Time their planting and harvesting optimally</span>
                  </li>
                  <li className="flex">
                    <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-500">Get fair prices for their produce</span>
                  </li>
                  <li className="flex">
                    <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-500">Access government support programs</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Farmers working in field"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white">
                Trusted by farmers across the country
              </h2>
              <p className="mt-4 text-lg text-primary-100">
                Here's what our users are saying about how Farmer's Portal has transformed their farming practices.
              </p>
              <div className="mt-8">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <svg
                      key={rating}
                      className="h-5 w-5 text-accent-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mt-2 text-sm text-primary-200">
                  Based on 200+ reviews from verified farmers
                </p>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <blockquote>
                <div className="max-w-3xl mx-auto text-center text-xl leading-9 font-medium text-white">
                  <p>
                    "Farmer's Portal has completely changed how I plan my crops. With accurate weather forecasts and price predictions, I've been able to increase my income by 25% in just one season."
                  </p>
                </div>
                <footer className="mt-8">
                  <div className="md:flex md:items-center md:justify-center">
                    <div className="md:flex-shrink-0">
                      <img
                        className="mx-auto h-10 w-10 rounded-full"
                        src="https://images.pexels.com/photos/4046551/pexels-photo-4046551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                      />
                    </div>
                    <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                      <div className="text-base font-medium text-white">Rajesh Kumar</div>

                      <svg className="hidden md:block mx-1 h-5 w-5 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 0h3L9 20H6l5-20z" />
                      </svg>

                      <div className="text-base font-medium text-primary-200">Rice Farmer, Punjab</div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile App Section */}
      <div className="bg-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
                Mobile Access
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Take farming decisions on the go
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Our mobile-responsive design ensures you have access to all farming information right from your smartphone, even with limited connectivity.
              </p>
              
              <dl className="mt-10 space-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <Smartphone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Works offline
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Critical information is cached for offline access when you're in the field with limited connectivity.
                    </dd>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <Sun className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Low-bandwidth optimized
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Designed to load quickly even on 2G connections, ensuring you get critical updates regardless of your connectivity.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            
            <div className="mt-10 lg:mt-0 pl-4">
              <div className="relative mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
                  src="https://images.pexels.com/photos/5702335/pexels-photo-5702335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Farmer using smartphone in field"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div id="contact" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-lg text-gray-500">
              Have questions or feedback about Farmer's Portal? We'd love to hear from you!
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto">
            <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              <div>
                <Button type="submit" variant="primary" fullWidth>
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;