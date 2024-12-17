import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleMeeting = ({ userId }) => {
    const [date, setDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (date) {
            axios.get(`http://localhost:5001/api/meetings/available-slots?date=${date}`)
                .then(response => {
                    setAvailableSlots(response.data.availableSlots);
                })
                .catch(error => {
                    console.error('Error fetching available slots', error);
                });
        }
    }, [date]);

    const handleSchedule = async () => {
        if (!selectedSlot) {
            setMessage('Please select a time slot.');
            return;
        }

        try {
            
            const response = await axios.post('http://localhost:5001/api/payments/checkout', {});
            const paymentUrl = response.data.url;

            
            await axios.post('http://localhost:5001/api/meetings/schedule', {
                userId,
                date,
                timeSlot: selectedSlot,
            });

            
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('Error scheduling meeting or initiating payment:', error);
            setMessage('Failed to schedule meeting or initiate payment. Please try again.');
        }
    };

    return (
        <div className="schedule-meeting-container">
            <h2>Schedule a Consultation Meeting</h2>
            <label>
                Select a Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            {availableSlots.length > 0 && (
                <div>
                    <h3>Available Slots</h3>
                    <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
                        <option value="">Select a time slot</option>
                        {availableSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
            )}

            <button onClick={handleSchedule}>Schedule and Pay</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ScheduleMeeting;
