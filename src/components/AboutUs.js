import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-section" id="about">
      <h2>About Us</h2>
      <p>At AdmissionsExpress.com, our mission is to unlock opportunities for students globally. We combine innovative technology with personalized guidance from our team of U.S.-based advisors, who are available to speak with students within four hours of any request. With our cutting-edge AI-powered Profile Matching, we provide tailored university recommendations that align with each student's academic profile, interests, and career aspirations.
        Our platform allows students to apply to multiple universities without restrictions and offers support for applications to institutions in the U.S., Canada, Europe, and Australia. Our commitment to quality has resulted in a 99% admissions success rate, with an over 80% visa approval rate for international students. Trust AdmissionsExpress.com to bring expertise, innovation, and personalized support to your admissions journey.</p>
      <a href="/about" className="about-link">Read More About Us</a>
    </div>
  );
};

export default AboutUs;
