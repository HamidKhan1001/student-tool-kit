
import React from 'react';
import './Recommendation.css';

const Recommendation = ({ recommendations, handleApply }) => {
    return (
        <div className="recommendation-section">
            <h2>Recommended Universities</h2>
            <div className="recommendation-list">
                {recommendations.map((university, index) => (
                    <div key={index} className="university-card">
                        <h3>{university.name}</h3>
                        <p>Country: {university.country}</p>
                        <p>Details: {university.details}</p>
                        <button onClick={handleApply} className="apply-button">Apply Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendation;
