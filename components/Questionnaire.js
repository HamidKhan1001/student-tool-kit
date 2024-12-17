import React, { useState } from 'react';

const Questionnaire = ({ onSubmit }) => {
  const [country, setCountry] = useState('');
  const [studyYear, setStudyYear] = useState('');

  const handleSubmit = () => {
    if (country && studyYear) {
      onSubmit({ country, studyYear });
    }
  };

  return (
    <div className="questionnaire">
      <h2>Questionnaire</h2>
      <div>
        <label>Which country are you planning to study in?</label>
        <div>
          <input
            type="radio"
            id="australia"
            name="country"
            value="Australia"
            onChange={(e) => setCountry(e.target.value)}
          />
          <label htmlFor="australia">Australia</label>
          <input
            type="radio"
            id="canada"
            name="country"
            value="Canada"
            onChange={(e) => setCountry(e.target.value)}
          />
          <label htmlFor="canada">Canada</label>
          <input
            type="radio"
            id="usa"
            name="country"
            value="USA"
            onChange={(e) => setCountry(e.target.value)}
          />
          <label htmlFor="usa">USA</label>
          <input
            type="radio"
            id="uk"
            name="country"
            value="UK"
            onChange={(e) => setCountry(e.target.value)}
          />
          <label htmlFor="uk">UK</label>
        </div>
      </div>

      <div>
        <label>Which year are you planning to study?</label>
        <div>
          <input
            type="radio"
            id="12-years"
            name="studyYear"
            value="12 years"
            onChange={(e) => setStudyYear(e.target.value)}
          />
          <label htmlFor="12-years">12 years</label>
          <input
            type="radio"
            id="16-years"
            name="studyYear"
            value="16 years"
            onChange={(e) => setStudyYear(e.target.value)}
          />
          <label htmlFor="16-years">16 years</label>
          <input
            type="radio"
            id="bs"
            name="studyYear"
            value="BS"
            onChange={(e) => setStudyYear(e.target.value)}
          />
          <label htmlFor="bs">BS</label>
          <input
            type="radio"
            id="ms"
            name="studyYear"
            value="MS"
            onChange={(e) => setStudyYear(e.target.value)}
          />
          <label htmlFor="ms">MS</label>
          <input
            type="radio"
            id="phd"
            name="studyYear"
            value="PhD"
            onChange={(e) => setStudyYear(e.target.value)}
          />
          <label htmlFor="phd">PhD</label>
        </div>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Questionnaire;
