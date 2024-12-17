import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfileForm = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        contact: user.contact || '',
        location: user.location || '',
        city: user.city || '',
        province: user.province || '',
        gender: user.gender || '',
        birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '',
    });

    const [options, setOptions] = useState({
        locations: [],
        provinces: [],
        genders: ['Male', 'Female', 'Other', 'Prefer not to say']
    });

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [locationsResponse, provincesResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/profile/locations'),
                    axios.get('http://localhost:5000/api/profile/provinces')
                ]);

                setOptions(prevOptions => ({
                    ...prevOptions,
                    locations: locationsResponse.data,
                    provinces: provincesResponse.data
                }));
            } catch (error) {
                console.error('Error fetching profile options:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/questionnaires/profile/update/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            console.log('Profile update response:', response.data);
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error('Error updating profile:', {
                message: error.message,
                response: error.response,
                request: error.request
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="edit-questionnaire-overlay">
            <div className="edit-questionnaire-modal">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className='vertical-form'>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact">Contact Number</label>
                        <input
                            type="tel"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="Enter contact number"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="province">Province</label>
                        <input
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                        />
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            {options.genders.map(gender => (
                                <option key={gender} value={gender}>{gender}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthdate">Birthdate</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit">Update Profile</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;
