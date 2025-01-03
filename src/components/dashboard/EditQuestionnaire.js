import React, { useState, useEffect } from 'react';
import './EditQuestionnaire.css';
import axios from 'axios';

const EditQuestionnaire = ({ questionnaireId, questionnaireData, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        educationLevelId: questionnaireData.educationLevelId,
        fieldOfStudyId: questionnaireData.fieldOfStudyId,
        countryId: questionnaireData.countryId,
        languageTest: questionnaireData.languageTest,
        feeId: questionnaireData.feeId,
    });
    const apiUrlRootPath = process.env.REACT_APP_API_URL;
    const [options, setOptions] = useState({
        educationLevels: [],
        fieldsOfStudy: [],
        countries: [],
        fees: []
    });

    useEffect(() => {
        const fetchOptions = async () => {
            const [educationLevels, fields, countries, fees] = await Promise.all([
                axios.get(`${apiUrlRootPath}/questionnaires/education-levels`),
                axios.get(`${apiUrlRootPath}/questionnaires/fields-of-study`),
                axios.get(`${apiUrlRootPath}/questionnaires/countries`),
                axios.get(`${apiUrlRootPath}/questionnaires/fees`)
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
            const response = await axios.put(
                `${apiUrlRootPath}/questionnaires/update/${questionnaireId}`, 
                formData
            );
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    return (
        <div className="questionnaire-modal-backdrop">
            <div className="questionnaire-modal-container">
                <div className="questionnaire-modal-header">
                    <h2>Update Your Academic Preferences</h2>
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="questionnaire-form">
                    <div className="form-section">
                        <label className="form-label">Education Level</label>
                        <select
                            className="form-select"
                            value={formData.educationLevelId}
                            onChange={(e) => setFormData({ ...formData, educationLevelId: e.target.value })}
                        >
                            <option value="">Select Education Level</option>
                            {options.educationLevels.map(level => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-section">
                        <label className="form-label">Field of Study</label>
                        <select
                            className="form-select"
                            value={formData.fieldOfStudyId}
                            onChange={(e) => setFormData({ ...formData, fieldOfStudyId: e.target.value })}
                        >
                            <option value="">Select Field</option>
                            {options.fieldsOfStudy.map(field => (
                                <option key={field.id} value={field.id}>{field.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-section">
                        <label className="form-label">Preferred Country</label>
                        <select
                            className="form-select"
                            value={formData.countryId}
                            onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                        >
                            <option value="">Select Country</option>
                            {options.countries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-section">
                        <label className="form-label">English Proficiency Test</label>
                        <select
                            className="form-select"
                            value={formData.languageTest}
                            onChange={(e) => setFormData({ ...formData, languageTest: e.target.value })}
                        >
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="form-section">
                        <label className="form-label">Expected Tuition Range</label>
                        <select
                            className="form-select"
                            value={formData.feeId}
                            onChange={(e) => setFormData({ ...formData, feeId: e.target.value })}
                        >
                            <option value="">Select Range</option>
                            {options.fees.map(fee => (
                                <option key={fee.id} value={fee.id}>{fee.amount}</option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditQuestionnaire;
