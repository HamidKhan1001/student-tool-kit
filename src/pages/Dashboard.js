import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import Questionnaire from '../components/dashboard/Questionnaire';
import ProfileForm from '../components/dashboard/ProfileForm';
import EditQuestionnaire from '../components/dashboard/EditQuestionnaire';
import EditProfileForm from '../components/dashboard/EditProfileForm';

import axios from 'axios';
import '../components/dashboard/Dashboard.css';
import DocumentUploadModal from '../components/DocumentUploadModal';
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
const Dashboard = ({ user, setUser, handleLogout }) => {
    const navigate = useNavigate();
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [hasAnsweredQuestionnaire, setHasAnsweredQuestionnaire] = useState(false);
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
    const [showEditQuestionnaire, setShowEditQuestionnaire] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [userDocuments, setUserDocuments] = useState([]);
    const [certificateTypes, setCertificateTypes] = useState([]);
    const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
    const [showEditProfileForm, setShowEditProfileForm] = useState(false);
    const [numPages, setNumPages] = useState(null);
    // Add this function
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    // In the useEffect where you fetch documents
    useEffect(() => {
        const fetchUserDocuments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/uploads/user-documents/${user.id}`);
                // Ensure response data is an array
                setUserDocuments(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching documents:', error);
                setUserDocuments([]); // Fallback to empty array
            }
        };

        if (user?.id) {
            fetchUserDocuments();
        }
    }, [user]);

    const handleDocumentUploadSuccess = async (certificateId) => {
        try {
            // Fetch the most recently uploaded document for this certificateId
            const response = await axios.get(`http://localhost:5000/api/uploads/user-documents/${user.id}`);

            // Find the document that matches the certificateId
            const newDocument = response.data.find(doc => doc.certificateId === certificateId);

            if (newDocument) {
                // Update userDocuments state
                setUserDocuments(prevDocuments => {
                    // Remove any existing document for this certificateId and add new one
                    return [
                        ...prevDocuments.filter(doc => doc.certificateId !== certificateId),
                        newDocument
                    ];
                });
            }
        } catch (error) {
            console.error('Error fetching updated documents:', error);
        }
    };
    console.log(certificateTypes);
    console.log(userDocuments);
    useEffect(() => {
        // Fetch certifications from the backend
        fetch('http://localhost:5000/api/questionnaires/certifications')
            .then(response => response.json())
            .then(data => setCertificateTypes(data))
            .catch(error => console.error('Error fetching certifications:', error));


    }, []);
    const handleEditClick = () => {
        setShowEditQuestionnaire(true);
    };

    const handleQuestionnaireUpdate = (updatedData) => {
        checkQuestionnaireStatus();
    };


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.id) {
            checkQuestionnaireStatus();
        }
    }, [user]);

    const checkQuestionnaireStatus = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || !storedUser.id) {
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/questionnaires/status/${storedUser.id}`);
            setSelectedQuestionnaire(response.data.questionnaire);
            setHasAnsweredQuestionnaire(response.data.hasAnswered);
            // Check if profile is complete
            const profileResponse = await axios.get(`http://localhost:5000/api/questionnaires/profile-status/${storedUser.id}`);
            setHasCompletedProfile(profileResponse.data.hasCompletedProfile);
        } catch (error) {
            console.log('Error checking questionnaire status:', error);
        }
    };

    useEffect(() => {
        if (user) {
            checkQuestionnaireStatus();
        }
    }, [user]);

    const handleRecommendationsClick = (e) => {
        e.preventDefault();
        if (!hasAnsweredQuestionnaire) {
            setShowQuestionnaire(true);
        } else if (!hasCompletedProfile) {
            setShowProfileForm(true);
        } else {
            navigate(`/recommendations?userId=${user.id}`);
        }
    };
    return (
        <div className="dashboard-container">
            <main className="dashboard-main">
                <div className="dashboard-content">
                    <div className="dashboard-header">
                        <h1 className="main-heading">Welcome to Admissions Express</h1>
                        {/* <h2>Welcome, {user.name}!</h2> */}

                        <button
                            className="recommendations-button"
                            onClick={handleRecommendationsClick}
                        >
                            My Recommendations
                        </button>
                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        {selectedQuestionnaire && (
                            <div className="questionnaire-summary-box">
                                <h3>Thank you for answering the questionnaire!</h3>
                                <div className="questionnaire-details">
                                    <div className="detail-item">
                                        <span className="detail-label">Highest Education:</span>
                                        <span className="detail-value">{selectedQuestionnaire.EducationLevel.name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Field of Study:</span>
                                        <span className="detail-value">{selectedQuestionnaire.FieldOfStudy.name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Country:</span>
                                        <span className="detail-value">{selectedQuestionnaire.Country.name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">English Proficiency:</span>
                                        <span className="detail-value">{selectedQuestionnaire.languageTest}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Est Fee:</span>
                                        <span className="detail-value">{selectedQuestionnaire.Fee.amount}</span>
                                    </div>
                                </div>
                                <button onClick={handleEditClick} className="edit-questionnaire-button">
                                    Edit Questionnaire
                                </button>



                            </div>
                        )}
                        <h1 className="profile-main-heading">Profile</h1>
                        <div className="profile-summary-box">
                            <h3>My Profile Information</h3>
                            <div className="profile-details">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>First Name:</strong> {user.firstName || 'Not provided'}</p>
                                <p><strong>Last Name:</strong> {user.lastName || 'Not provided'}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Contact:</strong> {user.contact || 'Not provided'}</p>
                                <p><strong>Location:</strong> {user.location || 'Not provided'}</p>
                                <p><strong>City:</strong> {user.city || 'Not provided'}</p>
                                <p><strong>Province:</strong> {user.province || 'Not provided'}</p>
                                <p><strong>Gender:</strong> {user.gender || 'Not provided'}</p>
                                <p><strong>Birthdate:</strong> {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'Not provided'}</p>
                            </div>
                            <button className="edit-profile-button"
                                onClick={() => setShowEditProfileForm(true)}>
                                Edit Profile
                            </button>
                        </div>

                        <h1 className="documents-main-heading">My Documents</h1>
                        <div className="documents-summary-box">
                            <h3>Ready to Upload Documents?</h3>
                            <div className="documents-details">
                                <p>Upload Your Documents today to get started on your college application ahead of time. Please check 'My Recommendations' to see what colleges do you match with.</p>
                            </div>
                            <button className="upload-documents-button"
                                onClick={() => setIsModalOpen(true)}>
                                Upload Documents
                            </button>
                        </div>
                        <DocumentUploadModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            userId={user.id} // Pass the user ID
                            onUploadSuccess={handleDocumentUploadSuccess} // Add this prop
                        />
                        <h1 className="checklist-main-heading">Required Documents Checklist</h1>
                        <div className="checklist-summary-box">
                            <h3>Application Documents Status</h3>
                            <div className="checklist-details">
                                {certificateTypes.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="checklist-item"
                                        onClick={() => {
                                            const matchingDoc = userDocuments.find(doc => doc.certificateId === cert.id);
                                            setSelectedDocument(matchingDoc);
                                            setShowDocumentModal(true);
                                        }}
                                    >
                                        <span>{cert.name}</span>
                                        <i className={`fas ${userDocuments.find(doc => doc.certificateId === cert.id) ? 'fa-check-circle' : 'fa-times-circle'} check-icon`}></i>
                                    </div>
                                ))}
                                {showDocumentModal && (
                                    <div className="document-modal">
                                        <div className="document-modal-content">
                                            <span className="close" onClick={() => setShowDocumentModal(false)}>×</span>
                                            {selectedDocument ? (
                                                selectedDocument.imagePath.toLowerCase().endsWith('.pdf') ? (
                                                    <div style={{ width: '100%', height: '750px', overflowY: 'auto' }}>
                                                        <iframe
                                                            src={`http://localhost:5000/${selectedDocument.imagePath}`}
                                                            width="100%"
                                                            height="750px"
                                                            title="PDF Document"
                                                            style={{ border: 'none' }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={`http://localhost:5000/${selectedDocument.imagePath}`}
                                                        alt="Document"
                                                    />
                                                )
                                            ) : (
                                                <p>No document uploaded yet</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>


                    {showEditProfileForm && (
                        <EditProfileForm
                            user={user}
                            onClose={() => setShowEditProfileForm(false)}
                            onUpdate={(updatedProfile) => {
                                setUser(prevUser => ({
                                    ...prevUser,
                                    ...updatedProfile
                                }));
                                localStorage.setItem('user', JSON.stringify({ ...user, ...updatedProfile }));
                                setShowEditProfileForm(false);
                            }}
                        />
                    )}
                    {showEditQuestionnaire && (
                        <EditQuestionnaire
                            questionnaireId={selectedQuestionnaire.id}
                            questionnaireData={selectedQuestionnaire}
                            onClose={() => setShowEditQuestionnaire(false)}
                            onUpdate={handleQuestionnaireUpdate}
                        />
                    )}
                    {showQuestionnaire && (
                        <Questionnaire
                            user={user}
                            onSubmit={(data) => {
                                setShowQuestionnaire(false);
                                setShowProfileForm(true);
                                checkQuestionnaireStatus();
                            }}
                            onClose={() => setShowQuestionnaire(false)}
                            onUpdate={handleQuestionnaireUpdate}
                        />
                    )}

                    {showProfileForm && (
                        <ProfileForm
                            user={user}
                            onSubmit={(profileData) => {
                                // Handle profile data submission
                                setUser(prevUser => ({
                                    ...prevUser,
                                    ...profileData
                                }));
                                localStorage.setItem('user', JSON.stringify({ ...user, ...profileData }));
                                checkQuestionnaireStatus();
                            }}
                            onClose={() => setShowProfileForm(false)}
                            onUpdate={(data) => {
                                // Additional update logic if needed
                                console.log('Profile updated', data);
                            }}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;