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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/dashboard" element={<Dashboard />} />
        <Route path="/pages/businesses" element={<Businesses />} />
        <Route path="/pages/properties" element={<Properties />} />
        <Route path="/pages/stable" element={<Stable />} />
        <Route path="/pages/character" element={<Character />} />
        <Route path="/pages/government" element={<Government />} />
        <Route path="/pages/applications/staff" element={<Staffapp />} />
        <Route path="/pages/applications/developer" element={<Developerapp />} />
        <Route path="/pages/applications/tester" element={<Testapp />} />
        <Route path="/buisnessinfo/:id" element={<Buisnessinfo />} />
        <Route path="/propertyinfo/:id" element={<PropertyInfo />} />
      </Routes>
    </Router>
  )
}

export default App