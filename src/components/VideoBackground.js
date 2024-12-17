import React from 'react';
import './VideoBackground.css';

const VideoBackground = () => {
  return (
    <div className="video-background ">
      <video autoPlay loop muted>
        <source src="/vid.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay">
        <div className="welcome-text">
        <h6>Hello Students</h6>
        <h2>Welcome to Admissions Express</h2>
          <p>
            Your Path to Higher Education Success.Where we empower students worldwide to achieve their educational dreams with ease and confidence. We are here to simplify the admissions process and ensure you have the resources, support, and tools to reach your highest potential. From advanced technology to personalized, US-based advisors, we are dedicated to creating a seamless and effective experience for every applicant.
          </p>
          <button className="sign-up-btn">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
