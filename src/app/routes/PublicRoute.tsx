import React from 'react'
import { useAuth } from '../../features/auth/hooks/useAuth'
import Loader from '../../shared/components/Loader/AppLoader'
import { Navigate } from 'react-router-dom'

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { loading, isAuthenticated } = useAuth()
    console.log('public',isAuthenticated);
    
    if(loading) return <Loader/>
    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }
        
    return children;
}

export default PublicRoute