import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../dashboard/ProfileForm.css'; // Assuming you'll create a similar CSS file

const ProfileForm = ({ user, onSubmit, onClose, onUpdate }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

    // State for dropdown options if needed
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const user_id = user.id;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrlRootPath}/questionnaires/profile/${user_id}`, {
                user_id,
                firstName,
                lastName,
                birthdate,
                phone,
                city,
                province,
                gender
            });

            if (response.status === 200 || response.status === 201) {
                onSubmit(response.data.user); // Pass the profile data to the parent component
                onUpdate(response.data);
                onClose(); // Close the modal on success
            }
        } catch (error) {
            console.log(error);
            setError('Failed to submit profile. Please check your connection or try again later.');
        }
    };

    // Optional: Fetch additional dropdown data if needed
    useEffect(() => {
        const fetchDropdownOptions = async () => {
            try {
                // Example of fetching provinces or cities
                // const provincesResponse = await axios.get('http://localhost:5000/api/locations/provinces');
                // const citiesResponse = await axios.get('http://localhost:5000/api/locations/cities');
                
                // setProvinces(provincesResponse.data);
                // setCities(citiesResponse.data);
            } catch (error) {
                setError('Failed to load form options');
            }
        };

        fetchDropdownOptions();
    }, []);

    return (
        <div className="profile-modal">
            <div className="profile-content">
                {/* <button className="modal-close-btn" onClick={onClose}>×</button> */}

                <h2 className="form-title">Complete Your Profile</h2>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="vertical-form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthdate">Birthdate</label>
                        <input
                            id="birthdate"
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="province">Province</label>
                        <input
                            id="province"
                            type="text"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ProfileForm;
