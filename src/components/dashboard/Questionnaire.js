
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Questionnaire.css';

const Questionnaire = ({ user,onSubmit,onClose,onUpdate }) => {
    const [universities, setUniversities] = useState([]);
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [languageTest, setLanguageTest] = useState('');
    const [educationLevel, setEducationLevel] = useState('');

    const [country, setCountry] = useState('');
    const [fee, setFee] = useState('');
    const [error, setError] = useState('');

    // State for dropdown options
    const [educationLevels, setEducationLevels] = useState([]);
    const [fieldsOfStudy, setFieldsOfStudy] = useState([]);
    const [countries, setCountries] = useState([]);
    const [fees, setFees] = useState([]);
    const apiUrlRootPath = process.env.REACT_APP_API_URL;

    const user_id = user.id;
    console.log(user_id);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrlRootPath}/questionnaires/submit`, {
                user_id, fieldOfStudy,
                languageTest,
                country,
                fee,
                educationLevel
            });

            if (response.status === 200 || response.status === 201) {
                // setUniversities(response.data.universities);
                onSubmit(response.data.questionnaire); // Pass the questionnaire data to the parent component
                onUpdate(response.data);
                onClose(); // Close the modal on success
            }
        } catch (error) {
            console.log(error);
            
            setError('Failed to submit questionnaire. Please check your connection or try again later.');
        }
    };
    useEffect(() => {
        const fetchDropdownOptions = async () => {
            try {
                console.log('Fetching dropdown options...');
                const [
                    educationResponse,
                    fieldsResponse,
                    countriesResponse,
                    feesResponse
                ] = await Promise.all([
                    axios.get(`${apiUrlRootPath}/questionnaires/education-levels`),
                    axios.get(`${apiUrlRootPath}/questionnaires/fields-of-study`),
                    axios.get(`${apiUrlRootPath}/questionnaires/countries`),
                    axios.get(`${apiUrlRootPath}/questionnaires/fees`)
                ]);
                // console.log('Responses received:', {
                //     education: educationResponse.data,
                //     fields: fieldsResponse.data,
                //     countries: countriesResponse.data,
                //     fees: feesResponse.data
                // });

                setEducationLevels(educationResponse.data);
                setFieldsOfStudy(fieldsResponse.data);
                setCountries(countriesResponse.data);
                setFees(feesResponse.data);
            } catch (error) {
                setError('Failed to load form options');
            }
        };

        fetchDropdownOptions();
    }, []);
    return (
        <div className="questionnaire-modal">
            <div className="questionnaire-content">
                <button className="modal-close-btn" onClick={onClose}>×</button>

                {/* <div className="form-container"> */}
                    <h2 className="form-title">Tell Us About Yourself</h2>

                    {error && <p className="error-message">{error}</p>}

                    <form onSubmit={handleSubmit} className="vertical-form">
                        <div className="form-group">
                            <label htmlFor="educationLevel">Your Highest Level of Education</label>
                            <select
                                id="educationLevel"
                                value={educationLevel}
                                onChange={(e) => setEducationLevel(e.target.value)}
                                required
                            >
                                <option value="">Select Education Level</option>
                                {educationLevels.map(level => (
                                    <option key={level.id} value={level.id}>
                                        {level.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="fieldOfStudy">What is your Field of Study?</label>
                            <select
                                id="fieldOfStudy"
                                value={fieldOfStudy}
                                onChange={(e) => setFieldOfStudy(e.target.value)}
                                required
                            >
                                <option value="">Select Field of Study</option>
                                {fieldsOfStudy.map(field => (
                                    <option key={field.id} value={field.id}>
                                        {field.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="languageTest">Language Test Score</label>
                            <select
                                id="languageTest"
                                value={languageTest}
                                onChange={(e) => setLanguageTest(e.target.value)}
                                required
                            >
                                <option value="">Select Language Test</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country of Interest</label>
                            <select
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                <option value="">Select Country</option>
                                {countries.map(country => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="fee">Estimated Financial Support Evidence</label>
                            <select
                                id="fee"
                                value={fee}
                                onChange={(e) => setFee(e.target.value)}
                                required
                            >
                                <option value="">Select Amount</option>
                                {fees.map(fee => (
                                    <option key={fee.id} value={fee.id}>
                                        {fee.amount} {fee.currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="button-group">
                            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
 </form>
                {/* </div> */}
            </div>
        </div>
    );

}

export default Questionnaire;


{/* {universities.length > 0 && (
    <div className="universities-list">
        <h3 className="universities-header">Universities in {country}</h3>
        <div className="universities-grid">
            {universities.map((uni, index) => (
                <div key={index} className="university-card">
                    <div className="university-content">
                        <h4 className="university-name">{uni.name}</h4>
                        <p className="university-details">{uni.details}</p>
                        <button className="join-now-btn" onClick={() => window.location.href = uni.applicationUrl || '#'}>
                            Join Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
)} */}