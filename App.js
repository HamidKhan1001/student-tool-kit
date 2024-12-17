import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

import VideoBackground from './components/VideoBackground';
import UniversitySlider from './components/UniversitySlider';
import AboutUs from './components/AboutUs';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import './App.css';

const App = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const cards = [
    {
      name: 'University of California',
      description: 'Highly ranked public university in California.',
      detailedDescription: 'World-class research and academic excellence.',
      rank: '1st in Public Universities (U.S.)',
    },
    {
      name: 'Cincinnati University',
      description: 'Top-tier university in Ohio.',
      detailedDescription: 'Renowned for engineering programs.',
      rank: '75th in National Universities (U.S.)',
    },
    {
      name: 'University of Arizona',
      description: 'Research-focused university in the Southwest.',
      detailedDescription: 'Famous for research in agriculture.',
      rank: '115th in National Universities (U.S.)',
    },
  ];

  const handleScroll = () => {
    setNavbarVisible(window.scrollY <= 100);
  };

  const handleSlide = (direction) => {
    setCardIndex((prevIndex) =>
      direction === 'left' ? (prevIndex > 0 ? prevIndex - 1 : cards.length - 1) : (prevIndex < cards.length - 1 ? prevIndex + 1 : 0)
    );
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuthProvider>
    <Router>
      <div className="app-container">
        <Navbar navbarVisible={navbarVisible} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <VideoBackground />
                <section className="featured-universities">
                  <h2>Featured Universities</h2>
                  <UniversitySlider cards={cards} cardIndex={cardIndex} handleSlide={handleSlide} />
                </section>
                <AboutUs />
              </>
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
