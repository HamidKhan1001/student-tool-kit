import React from 'react';

const Recommendation = ({ country, studyYear }) => {
  const universities = {
    USA: ['Harvard University', 'MIT', 'Stanford University'],
    UK: ['University of Oxford', 'University of Cambridge'],
    Australia: ['University of Melbourne', 'Australian National University'],
  };

  return (
    <div className="recommendation">
      <h2>University Recommendations</h2>
      <p>Recommended universities for you:</p>
      <ul>
        {universities[country]?.map((university) => (
          <li key={university}>{university}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
