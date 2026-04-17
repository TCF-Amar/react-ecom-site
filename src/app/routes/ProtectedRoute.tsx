import React from 'react'
import { useAuth } from '../../features/auth/hooks/useAuth'
import Loader from '../../shared/components/Loader/AppLoader';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated } = useAuth();

  
  if (loading) return <Loader />;
  
  if (!isAuthenticated) {
    console.log("protected",isAuthenticated);
    return <Navigate to="/auth?mode=sign-in" replace />;
  }
  return children;

}

export default ProtectedRoute;