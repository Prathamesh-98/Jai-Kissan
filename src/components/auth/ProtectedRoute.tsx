import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'farmer' | 'broker';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { isAuthenticated, userType: currentUserType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/${userType}/login`} replace />;
  }

  if (currentUserType !== userType) {
    return <Navigate to={`/${currentUserType}/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;