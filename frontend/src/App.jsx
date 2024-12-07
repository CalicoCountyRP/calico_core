import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard'
import Businesses from './pages/businesses'
import Properties from './pages/properties'
import Stable from './pages/stable'
import Character from './pages/character';
import Government from './pages/government';
import Staffapp from './pages/applications/staff';
import Developerapp from './pages/applications/developer';
import Testapp from './pages/applications/tester';
import Buisnessinfo from './pages/Buisnessinfo';
import PropertyInfo from './pages/Propertyinfo';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8081/auth/check', { credentials: 'include' });
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/pages/businesses" 
          element={
            <PrivateRoute>
              <Businesses />
            </PrivateRoute>
          }
        />
        <Route path="/pages/properties" 
          element={
            <PrivateRoute>
              <Properties />
            </PrivateRoute>
          } />
        <Route path="/pages/stable" 
          element={
            <PrivateRoute>
              <Stable />
            </PrivateRoute>
          } />
        <Route path="/pages/character" 
          element={
            <PrivateRoute>
              <Character />
            </PrivateRoute>
          } />
        <Route path="/pages/government" 
          element={
            <PrivateRoute>
              <Government />
            </PrivateRoute>
          } />
        <Route path="/pages/applications/staff" 
          element={
            <PrivateRoute>
              <Staffapp />
            </PrivateRoute>
          } />
        <Route path="/pages/applications/developer" 
          element={
            <PrivateRoute>
              <Developerapp />
            </PrivateRoute>
          } />
        <Route path="/pages/applications/tester" 
          element={
            <PrivateRoute>
              <Testapp />
            </PrivateRoute>
          } />
        <Route path="/buisnessinfo/:id" 
          element={
            <PrivateRoute>
              <Buisnessinfo />
            </PrivateRoute>
          } />
        <Route path="/propertyinfo/:id" 
          element={
            <PrivateRoute>
              <PropertyInfo />
            </PrivateRoute>
          } />
      </Routes>
    </Router>
  )
}

export default App