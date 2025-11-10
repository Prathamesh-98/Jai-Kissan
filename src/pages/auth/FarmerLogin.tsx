import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { validateEmail, validatePhone } from '../../utils/validation';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';

const FarmerLogin: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();


  
  const toggleLoginMethod = () => {
    setLoginMethod(prev => prev === 'email' ? 'phone' : 'email');
    setErrors({});
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setErrors({});
      console.log('Starting Google sign in...');
      
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      
      console.log('Google sign in successful:', firebaseUser);
      
      if (firebaseUser.email) {
        // Store Firebase user info separately for profile picture access
        const firebaseUserInfo = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        localStorage.setItem('firebaseUser', JSON.stringify(firebaseUserInfo));
        
        console.log('Attempting login through AuthContext...');
        
        // Use your existing AuthContext login function
        // This will properly update the context and handle navigation
        const success = await login(firebaseUser.email, 'google-auth-token', 'farmer');
        
        if (success) {
          console.log('AuthContext login successful, navigating...');
          navigate('/farmer/dashboard');
        } else {
          console.error('AuthContext login failed');
          setErrors({ form: 'Authentication failed. Please try again.' });
        }
      } else {
        setErrors({ form: 'No email found in Google account.' });
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Google sign-in failed. Please try again.';
      
      if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups for this site and try again.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized for Google sign-in.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google sign-in is not enabled for this project.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Another sign-in popup is already open.';
      }
      
      setErrors({ form: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (loginMethod === 'email') {
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(email)) {
        newErrors.email = 'Email is invalid';
      }
    } else {
      if (!phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const identifier = loginMethod === 'email' ? email : phone;
      const success = await login(identifier, password, 'farmer');
      
      if (success) {
        navigate('/farmer/dashboard');
      } else {
        setErrors({ 
          form: 'Invalid login credentials. Please try again.'
        });
      }
    } catch (error) {
      setErrors({ 
        form: 'An error occurred during login. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <motion.div 
            className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white text-xl font-bold">FP</span>
          </motion.div>
        </div>
        <motion.h2 
          className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Farmer Login
        </motion.h2>
        <motion.p 
          className="mt-2 text-center text-sm text-gray-600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Access your farming dashboard with real-time information
        </motion.p>
      </div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center mb-6">
            <div className="relative inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-md 
                  ${loginMethod === 'email' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setLoginMethod('email')}
              >
                Email
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-md border-l-0 
                  ${loginMethod === 'phone' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setLoginMethod('phone')}
              >
                Phone
              </button>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.form && (
              <div className="rounded-md bg-error-50 p-4">
                <div className="text-sm text-error-700">{errors.form}</div>
              </div>
            )}
            
            {loginMethod === 'email' ? (
              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                fullWidth
                leftIcon={<Mail size={18} />}
              />
            ) : (
              <Input
                id="phone"
                type="tel"
                label="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                fullWidth
                leftIcon={<Phone size={18} />}
              />
            )}

            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              fullWidth
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={signInWithGoogle}
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/farmer/register"
                className="inline-flex items-center font-medium text-primary-600 hover:text-primary-500"
              >
                Register as a farmer
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="mt-4 text-center">
              <Link
                to="/broker/login"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                Login as a broker instead
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FarmerLogin;