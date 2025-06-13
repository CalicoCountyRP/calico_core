import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const allowedRoles = {
    'admin': ['admin'],
    'realtor': ['admin', 'realtor'],
    'user': ['admin', 'realtor', 'user']
};

const RoleBasedRoute = ({ children, allowedRoles: propAllowedRoles }) => {
    const [userRole, setUserRole] = useState('user');
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuthAndRole = async () => {
            try {
                // Check if user is authenticated
                const authResponse = await fetch(`${import.meta.env.VITE_REACT_API_URL}/auth/check`, {
                    credentials: 'include'
                });

                if (!authResponse.ok) {
                    throw new Error('Authentication check failed');
                }

                const authData = await authResponse.json();
                setIsAuthenticated(authData.authenticated);

                // If authenticated, fetch user role
                if (authData.authenticated) {
                    const roleResponse = await fetch(`${import.meta.env.VITE_REACT_API_URL}/auth/role`, {
                        credentials: 'include'
                    });

                    if (!roleResponse.ok) {
                        throw new Error('Failed to fetch user role');
                    }

                    const { role } = await roleResponse.json();
                    setUserRole(role);
                }
            } catch (err) {
                setError(err.message);
                console.error('Auth/Role check failed:', err);
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndRole();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!propAllowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default RoleBasedRoute;