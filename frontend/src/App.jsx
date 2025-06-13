import { React } from 'react';
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
import RoleBasedRoute from './components/RoleBasedRoute';
import AdminDashboard from './pages/admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/dashboard" 
          element={
            <RoleBasedRoute allowedRoles={['user', 'admin', 'realtor']}>
              <Dashboard />
            </RoleBasedRoute>
          }
        />
        <Route path="/pages/businesses" 
          element={
            <RoleBasedRoute allowedRoles={['user', 'admin', 'realtor']}>
              <Businesses />
            </RoleBasedRoute>
          }
        />
        <Route path="/pages/properties" 
          element={
            <RoleBasedRoute allowedRoles={['user', 'admin', 'realtor']}>
              <Properties />
            </RoleBasedRoute>
          }
        />
        <Route path="/pages/stable" 
          element={
            <RoleBasedRoute allowedRoles={['user', 'admin']}>
              <Stable />
            </RoleBasedRoute>
          }
        />
        <Route path="/pages/character" 
          element={
            <RoleBasedRoute allowedRoles={['user', 'admin', 'realtor']}>
              <Character />
            </RoleBasedRoute>
          } />
        <Route path="/pages/government" 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <Government />
            </RoleBasedRoute>
          } />
        <Route path="/pages/applications/staff" 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <Staffapp />
            </RoleBasedRoute>
          } />
        <Route path="/pages/applications/developer" 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <Developerapp />
            </RoleBasedRoute>
          } />
        <Route path="/pages/applications/tester" 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <Testapp />
            </RoleBasedRoute>
          } />
        <Route path="/buisnessinfo/:id" 
          element={
            <RoleBasedRoute allowedRoles={['admin', 'realtor']}>
              <Buisnessinfo />
            </RoleBasedRoute>
          } />
        <Route path="/propertyinfo/:id" 
          element={
            <RoleBasedRoute allowedRoles={['admin', 'realtor']}>
              <PropertyInfo />
            </RoleBasedRoute>
          } />
        <Route path="/pages/admin"
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleBasedRoute>
          } />
      </Routes>
    </Router>
  )
}

export default App