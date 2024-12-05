import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import PrivateRoute from './components/AuthCheck';

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