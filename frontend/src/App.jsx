import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard'
import Businesses from './pages/businesses'
import Properties from './pages/properties'
import Stable from './pages/stable'
import Character from './pages/character';
import Government from './pages/government';

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
      </Routes>
    </Router>
  )
}

export default App