import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarSchedular.css';
import { FaCalendar, FaClock, FaCheck } from 'react-icons/fa';

const CalendarScheduler = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');


  const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
  const API_KEY = 'YOUR_GOOGLE_API_KEY';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  useEffect(() => {
    initializeGoogleApi();
  }, []);

  const initializeGoogleApi = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    });
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    generateTimeSlots(date);
  };

  const handleScheduleMeeting = async (e) => {
    e.preventDefault();

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const event = {
      summary: meetingTitle,
      start: {
        dateTime: `${formattedDate}T${selectedTime}:00`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: `${formattedDate}T${selectedTime}:30`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    try {
      await gapi.auth2.getAuthInstance().signIn();
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      setEvents([...events, response.result]);
      setMeetingTitle('');
      setSelectedTime('');
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };
  const generateTimeSlots = (date) => {
    const times = [];
    const startTime = new Date(date).setHours(9, 0, 0);
    const endTime = new Date(date).setHours(17, 0, 0);

    for (let time = startTime; time < endTime; time += 30 * 60 * 1000) {
      times.push(new Date(time).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    }
    setAvailableTimes(times);
  };

  return (
    <div className="calendar-scheduler-wrapper">
      <div className="calendar-scheduler-container">
        <div className="scheduler-header">
          <FaCalendar className="header-icon" />
          <h1>Schedule Your Consultation</h1>
          <p>Select your preferred date and time for the meeting</p>
        </div>

        <div className="scheduler-content">
          <div className="calendar-section">
            <div className="section-title">
              <FaCalendar />
              <h2>Select Date</h2>
            </div>
            <Calendar 
              onChange={handleDateChange} 
              value={selectedDate}
              minDate={new Date()}
              className="custom-calendar"
            />
          </div>

          <div className="meeting-details-section">
            <div className="time-slots-section">
              <div className="section-title">
                <FaClock />
                <h2>Available Times</h2>
              </div>
              <div className="time-slots-grid">
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(time)}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleScheduleMeeting} className="meeting-form">
              <div className="section-title">
                <FaCheck />
                <h2>Meeting Details</h2>
              </div>
              <div className="form-group">
                <label>Meeting Title</label>
                <input
                  type="text"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="Enter meeting title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={meetingDescription}
                  onChange={(e) => setMeetingDescription(e.target.value)}
                  placeholder="Add meeting description"
                  rows="3"
                />
              </div>
              <button 
                type="submit" 
                className="schedule-button"
                disabled={!selectedTime}
              >
                Schedule Meeting
              </button>
            </form>
          </div>
        </div>

        <div className="scheduled-meetings-section">
          <h2>Upcoming Meetings</h2>
          <div className="meetings-grid">
            {events.map((event, index) => (
              <div key={index} className="meeting-card">
                <div className="meeting-card-header">
                  <h3>{event.summary}</h3>
                  <span className="meeting-date">
                    {new Date(event.start.dateTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="meeting-time">
                  <FaClock />
                  <span>{new Date(event.start.dateTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarScheduler;
