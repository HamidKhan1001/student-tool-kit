import React from 'react';
import './GoogleCalendar.css';
const CalendarScheduler = () => {
  const appointmentLink =
    'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0JZwZTneqoPDhTxY4ZwdDPSGDRkawbikej0qsW1l86pQE66Sjg_0uH7UKCxXHfd014AOxCL9Mv?gv=true';

  return (
    <div className="calendar-scheduler">
      <h2>Schedule an Appointment</h2>
      <p>
        Use the embedded calendar below to schedule an appointment.
      </p>
      <iframe
        src={appointmentLink}
        title="Google Appointments"
        width="100%"
        height="600px"
        frameBorder="0"
        style={{
          border: '5px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      ></iframe>
    </div>
  );
};

export default CalendarScheduler;