import React from 'react';
import './PaymentSection.css'; // We'll create this CSS file

const PaymentSection = () => {
  return (
    <div className="payment-section">
      <div className="payment-container">
        <h2>Schedule Your Consultation</h2>
        <p>Get personalized guidance from our expert consultants</p>
        
        <div className="payment-details">
          <div className="price-info">
            <span className="price">$25</span>
            <span className="per-text">Per Appointment</span>
          </div>
          
          <div className="payment-description">
            <p>Book a one-on-one consultation to discuss your admissions strategy, 
               application process, and receive personalized advice.</p>
          </div>
          
          <a 
            href="https://buy.stripe.com/4gwdS2dOW27v7UA5kk" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="payment-button"
          >
            Make Payment
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
