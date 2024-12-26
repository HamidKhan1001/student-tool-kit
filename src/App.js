import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import Home from './pages/Home';
import RecommendationsPage from './pages/RecommendationsPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';
import UniversitySlider from './components/UniversitySlider';
import SignInSignUp from './pages/SignInSignUp';
import 'jquery';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './FontAwesome.css';
import './App.css';
import './Owl.css';
import './LightBox.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
// axios.defaults.withCredentials = true;
const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!user) {
      return <Navigate to="/auth" />;
    }
    
    return <AuthenticatedLayout user={user} handleLogout={handleLogout}>{children}</AuthenticatedLayout>;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };
  return (
    <Routes>
      <Route path="/" element={
  <Home isAuthenticated={!!user} user={user} handleLogout={handleLogout} />
} />
      <Route path="/auth" element={
        user ? <Navigate to="/dashboard" /> : <SignInSignUp setUser={setUser} />
      } />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard user={user} setUser={setUser}  handleLogout={handleLogout} /></ProtectedRoute>} />
      <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage user={user} setUser={setUser}  handleLogout={handleLogout} /></ProtectedRoute>} />
    </Routes>
  );
};

export default App;
