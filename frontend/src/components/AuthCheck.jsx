import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem('auth'));
    console.log(isAuthenticated);

     return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;