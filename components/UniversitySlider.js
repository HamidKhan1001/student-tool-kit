import React, { useEffect, useState } from 'react';

const UniversitySlider = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    fetch('/api/universities')
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.error('Error fetching universities:', error));
  }, []);

  if (!universities || universities.length === 0) {
    return <p>Loading universities...</p>;
  }

  return (
    <div className="university-slider">
      {universities.map((university, index) => (
        <div key={index} className="university-card">
          <h3>{university.name}</h3>
          <p>{university.description}</p>
          <p className="rank">Rank: {university.rank}</p>
          <a href={university.link}>Learn More</a>
        </div>
      ))}
    </div>
  );
};

export default UniversitySlider;
