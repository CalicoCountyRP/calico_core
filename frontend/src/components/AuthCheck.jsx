import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem('auth'));
    localStorage.setItem('auth', true); //setting this here as a temp development step
    console.log(isAuthenticated);

     return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;