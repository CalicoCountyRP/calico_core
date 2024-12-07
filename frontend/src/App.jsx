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

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertShown, setAlertShown] = useState(false);

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

  if (!alertShown && !isAuthenticated && !loading) {
    alert('You are not authorized to view this page. Please login and try again.');
    setAlertShown(true);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
  /*return isAuthenticated ? children : <Navigate to="/" />;*/
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/pages/businesses" 
          element={
            <ProtectedRoute>
              <Businesses />
            </ProtectedRoute>
          }
        />
        <Route path="/pages/properties" 
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          } />
        <Route path="/pages/stable" 
          element={
            <ProtectedRoute>
              <Stable />
            </ProtectedRoute>
          } />
        <Route path="/pages/character" 
          element={
            <ProtectedRoute>
              <Character />
            </ProtectedRoute>
          } />
        <Route path="/pages/government" 
          element={
            <ProtectedRoute>
              <Government />
            </ProtectedRoute>
          } />
        <Route path="/pages/applications/staff" 
          element={
            <ProtectedRoute>
              <Staffapp />
            </ProtectedRoute>
          } />
        <Route path="/pages/applications/developer" 
          element={
            <ProtectedRoute>
              <Developerapp />
            </ProtectedRoute>
          } />
        <Route path="/pages/applications/tester" 
          element={
            <ProtectedRoute>
              <Testapp />
            </ProtectedRoute>
          } />
        <Route path="/buisnessinfo/:id" 
          element={
            <ProtectedRoute>
              <Buisnessinfo />
            </ProtectedRoute>
          } />
        <Route path="/propertyinfo/:id" 
          element={
            <ProtectedRoute>
              <PropertyInfo />
            </ProtectedRoute>
          } />
      </Routes>
    </Router>
  )
}

export default App