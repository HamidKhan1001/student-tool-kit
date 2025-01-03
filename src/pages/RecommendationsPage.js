import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CalendarScheduler from '../components/CalendarSchedular';
import GoogleCalendar from '../components/GoogleCalendar';
import PaymentSection from '../components/PaymentSection';
import './Recommendations.css';
const RecommendationsPage = ({ user, setUser, handleLogout }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasPayment, setHasPayment] = useState(false);
     const apiUrlRootPath = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`${apiUrlRootPath}/questionnaires/recommendations/${user.id}`);
                setRecommendations(response.data.recommendations);
                setHasPayment(response.data.hasPayment);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);
    const styles = {
        recommendationsContainer: {
            padding: '3rem',
            maxWidth: '1400px',
            marginTop: '300px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)'
        },
        heading: {
            textAlign: 'center',
            color: '#1a73e8',
            marginBottom: '3rem',
            fontSize: '3rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            background: 'linear-gradient(45deg, #1a73e8, #6a11cb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
        universitiesGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            padding: '1rem',
            perspective: '1000px',

        },
        universityCard: {
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s ease-in-out',
            transform: 'rotateY(-10deg)',
            transformStyle: 'preserve-3d',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #1a73e8, #6a11cb)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'content-box, border-box',
            ':hover': {
                transform: 'scale(1.05) rotateY(0)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
            }
        },
        cardHeading: {
            color: '#1a73e8',
            marginBottom: '1.5rem',
            fontSize: '1.8rem',
            fontWeight: '600',
            borderBottom: '2px solid #1a73e8',
            paddingBottom: '0.5rem'
        },
        cardText: {
            color: '#4a4a4a',
            margin: '1rem 0',
            lineHeight: 1.7,
            fontWeight: '300'
        },
        applyButton: {
            background: 'linear-gradient(45deg, #1a73e8, #6a11cb)',
            color: 'white',
            border: 'none',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            marginTop: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 10px 20px rgba(26, 115, 232, 0.3)',
            ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 30px rgba(26, 115, 232, 0.4)'
            }
        }
    };


    return (
        <>
            <div style={styles.recommendationsContainer} className="recommendations-container">
                <h2 >Your University Recommendations</h2>
                {loading ? (
                    <div>Loading recommendations...</div>
                ) : (
                    <div className="universities-grid">
                        {recommendations.map((university) => (
                            <div key={university.id} className="university-card">
                                <h3>{university.name}</h3>
                                <div className={`university-details ${hasPayment !== true ? 'blur-content' : ''}`}>
                                    <p>Country: {university.Country.name}</p>
                                    <p>Field: {university.FieldOfStudy.name}</p>
                                    <p>Annual Fee: {university.Fee.amount} {university.Fee.currency}</p>
                                    <p>{university.details}</p>
                                    <button
                                        className="apply-button"
                                        onClick={() => {
                                            if (!hasPayment) {
                                                // Redirect to payment section or show payment modal
                                                alert("Please complete payment to apply");
                                                return;
                                            }
                                            // Handle actual application process
                                        }}
                                    >
                                        {hasPayment ? 'Apply Now' : 'Unlock Application'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="payment-notice">
                    <h3>Complete payment to apply for Universities and other features</h3>
                </div>
                <PaymentSection />
                <div className={!hasPayment ? 'blur-content' : ''}>
                    <GoogleCalendar />
                </div>
            </div>

        </>

    );
};
export default RecommendationsPage;