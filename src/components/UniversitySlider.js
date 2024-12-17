import React from 'react';
import './UniversitySlider.css';

const UniversitySlider = ({ cards, cardIndex, handleSlide }) => {
  return (
    <div className="university-slider">
      {/* University Card */}
      <div className="university-card">
        <h3>{cards[cardIndex].name}</h3>
        <p>{cards[cardIndex].description}</p>
        <p>{cards[cardIndex].detailedDescription}</p> 
        <a href="#">Learn More</a>
        <p className="rank">Rank: {cards[cardIndex].rank}</p> 
      </div>

     
      <div className="slider-arrows">
        <button className="arrow" onClick={() => handleSlide('left')}>&lt;</button>
        <button className="arrow" onClick={() => handleSlide('right')}>&gt;</button>
      </div>
    </div>
  );
};

export default UniversitySlider;
