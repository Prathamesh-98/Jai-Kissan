import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { CropPriceProvider } from './contexts/CropPriceContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocationProvider } from './contexts/LocationContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FarmerLogin from './pages/auth/FarmerLogin';
import BrokerLogin from './pages/auth/BrokerLogin';
import FarmerRegister from './pages/auth/FarmerRegister';
import BrokerRegister from './pages/auth/BrokerRegister';
import FarmerDashboard from './pages/farmer/Dashboard';
import BrokerDashboard from './pages/broker/Dashboard';
import MarketPrices from './pages/farmer/MarketPrices';
import FarmersNetwork from './pages/broker/FarmersNetwork';
import Schemes from './pages/farmer/Schemes';
import CropCalendar from './pages/farmer/CropCalendar';
import FarmerProfile from './pages/farmer/Profile';
import BrokerProfile from './pages/broker/Profile';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
// Firebase Auth Components
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocationProvider>
          <WeatherProvider>
            <CropPriceProvider>
              <Router>
                <Routes>
                  {/* Original Landing Page - restored as homepage */}
                  <Route path="/" element={<LandingPage />} />
                  
                  {/* Firebase Auth Routes - added as additional options */}
                  <Route path="/auth/signin" element={<SignIn />} />
                  <Route path="/auth/signup" element={<SignUp />} />
                  <Route path="/auth/dashboard" element={<Dashboard />} />
                  
                  {/* Auth Routes */}
                  <Route path="/farmer/login" element={<FarmerLogin />} />
                  <Route path="/broker/login" element={<BrokerLogin />} />
                  <Route path="/farmer/register" element={<FarmerRegister />} />
                  <Route path="/broker/register" element={<BrokerRegister />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/farmer/dashboard" 
                    element={
                      <ProtectedRoute userType="farmer">
                        <FarmerDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/farmer/market-prices" 
                    element={
                      <ProtectedRoute userType="farmer">
                        <MarketPrices />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/farmer/schemes" 
                    element={
                      <ProtectedRoute userType="farmer">
                        <Schemes />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/farmer/crop-calendar" 
                    element={
                      <ProtectedRoute userType="farmer">
                        <CropCalendar />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/farmer/profile" 
                    element={
                      <ProtectedRoute userType="farmer">
                        <FarmerProfile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/broker/dashboard" 
                    element={
                      <ProtectedRoute userType="broker">
                        <BrokerDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/broker/market-prices" 
                    element={
                      <ProtectedRoute userType="broker">
                        <MarketPrices />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/broker/farmers" 
                    element={
                      <ProtectedRoute userType="broker">
                        <FarmersNetwork />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/broker/profile" 
                    element={
                      <ProtectedRoute userType="broker">
                        <BrokerProfile />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Fallback routes */}
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Router>
            </CropPriceProvider>
          </WeatherProvider>
        </LocationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;