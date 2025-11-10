import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // If no user info, redirect to sign in
      navigate('/auth/signin');
    }
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userInfo');
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-green-800">Jai Kissan Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {userInfo.photoURL ? (
                <img
                  className="h-24 w-24 rounded-full border-4 border-green-200"
                  src={userInfo.photoURL}
                  alt={userInfo.displayName || 'User'}
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-800">
                    {userInfo.displayName ? userInfo.displayName.charAt(0) : 'U'}
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, {userInfo.displayName || 'User'}!
              </h2>
              <p className="text-lg text-gray-600 mb-1">
                {userInfo.email}
              </p>
              <p className="text-sm text-gray-500">
                Successfully signed in to Jai Kissan
              </p>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Crop Management</h3>
              <p className="text-green-700">Manage your crops and track their progress</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Market Prices</h3>
              <p className="text-blue-700">View current market prices for your crops</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Weather Updates</h3>
              <p className="text-yellow-700">Get real-time weather information</p>
            </div>
          </div>

          {/* User Session Info */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">User ID:</span>
                <p className="text-gray-800 break-all">{userInfo.uid}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Login Time:</span>
                <p className="text-gray-800">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;