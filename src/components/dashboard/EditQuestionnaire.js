import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditQuestionnaire = ({ questionnaireId, questionnaireData, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        educationLevelId: questionnaireData.educationLevelId,
        fieldOfStudyId: questionnaireData.fieldOfStudyId,
        countryId: questionnaireData.countryId,
        languageTest: questionnaireData.languageTest,
        feeId: questionnaireData.feeId,
    });

    const [options, setOptions] = useState({
        educationLevels: [],
        fieldsOfStudy: [],
        countries: [],
        fees: []
    });

    useEffect(() => {
        const fetchOptions = async () => {
            const [educationLevels, fields, countries, fees] = await Promise.all([
                axios.get('http://localhost:5000/api/questionnaires/education-levels'),
                axios.get('http://localhost:5000/api/questionnaires/fields-of-study'),
                axios.get('http://localhost:5000/api/questionnaires/countries'),
                axios.get('http://localhost:5000/api/questionnaires/fees')
            ]);

            setOptions({
                educationLevels: educationLevels.data,
                fieldsOfStudy: fields.data,
                countries: countries.data,
                fees: fees.data
            });
        };

        fetchOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Log the request details
            console.log('Sending update request:', {
                url: `http://localhost:5000/api/questionnaires/update/${questionnaireId}`,
                data: formData
            });
    
            const response = await axios.put(`http://localhost:5000/api/questionnaires/update/${questionnaireId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
    
            console.log('Update response:', response.data);
            onUpdate(response.data);
            onClose();
        } catch (error) {
            // Detailed error logging
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                request: error.request
            });
        }
    };

    return (
        <div className="edit-questionnaire-overlay">
            <div className="edit-questionnaire-modal">
                <h2>Edit Questionnaire</h2>
                <form onSubmit={handleSubmit} className='vertical-form'>
                <div className="form-group">
                        <label htmlFor="educationLevel">Your Highest Level of Education</label>
                        <select
                            value={formData.educationLevelId}
                            onChange={(e) => setFormData({ ...formData, educationLevelId: e.target.value })}
                        >
                            <option value="">Select Education Level</option>
                            {options.educationLevels.map(level => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
        <label htmlFor="fieldOfStudy">Field of Study</label>
        <select
            value={formData.fieldOfStudyId}
            onChange={(e) => setFormData({ ...formData, fieldOfStudyId: e.target.value })}
        >
            <option value="">Select Field of Study</option>
            {options.fieldsOfStudy.map(field => (
                <option key={field.id} value={field.id}>{field.name}</option>
            ))}
        </select>
    </div>

    <div className="form-group">
        <label htmlFor="country">Preferred Country</label>
        <select
            value={formData.countryId}
            onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
        >
            <option value="">Select Country</option>
            {options.countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
            ))}
        </select>
    </div>

    <div className="form-group">
        <label htmlFor="languageTest">English Proficiency Test</label>
        <select
            value={formData.languageTest}
            onChange={(e) => setFormData({ ...formData, languageTest: e.target.value })}
        >
            <option value="">Select Test</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
         
        </select>
    </div>

    <div className="form-group">
        <label htmlFor="fee">Expected Tuition Fee Range</label>
        <select
            value={formData.feeId}
            onChange={(e) => setFormData({ ...formData, feeId: e.target.value })}
        >
            <option value="">Select Fee Range</option>
            {options.fees.map(fee => (
                <option key={fee.id} value={fee.id}>{fee.amount}</option>
            ))}
        </select>
    </div>
                    {/* Add similar select elements for other fields */}

                    <div className="button-group">
                        <button type="submit">Update</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditQuestionnaire;
