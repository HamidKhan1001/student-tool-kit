import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoBackground.css';

const VideoBackground = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src="/vid.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay">
        <div className="welcome-text">
          <h1>Your Path to Higher Education Success</h1>
          <p>
            Welcome to Admissions Express, where we empower students worldwide to achieve their educational dreams with ease and confidence. We are here to simplify the admissions process and ensure you have the resources, support, and tools to reach your highest potential. From advanced technology to personalized, US-based advisors, we are dedicated to creating a seamless and effective experience for every applicant.
          </p>
          <button className="sign-up-btn" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
