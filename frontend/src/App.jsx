import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Dashboard from './dashboard'
import Businesses from './businesses'
import Properties from './properties'
import Stable from './stable'
import Character from './character';
import Government from './government';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/stable" element={<Stable />} />
        <Route path="/character" element={<Character />} />
        <Route path="/government" element={<Government />} />
      </Routes>
    </Router>
  )
}

export default App