import React, { useState, useEffect } from 'react';
import './DocumentUploadModal.css';

const DocumentUploadModal = ({ isOpen, onClose,userId,onUploadSuccess  }) => {
    const [certifications, setCertifications] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const apiUrlRootPath = process.env.REACT_APP_API_URL;
    useEffect(() => {
        // Fetch certifications from the backend
        fetch(`${apiUrlRootPath}/questionnaires/certifications`)
            .then(response => response.json())
            .then(data => setCertifications(data))
            .catch(error => console.error('Error fetching certifications:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!selectedDocument || !selectedFile) {
            setError('Please select both document type and file');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('certificateId', selectedDocument);
        formData.append('file', selectedFile);
        formData.append('userId', userId);
        try {
            const response = await fetch(`${apiUrlRootPath}/uploads/upload-document`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Document uploaded successfully!');
                  // Call the onUploadSuccess callback with certificateId
                  onUploadSuccess(parseInt(selectedDocument));
             
                onClose();
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            alert('Error uploading document');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Document Upload Center</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Select a Document</label>
                        <select
                            value={selectedDocument}
                            onChange={(e) => setSelectedDocument(e.target.value)}
                            required
                            disabled={loading}
                        >
                            <option value="">Select document type</option>
                            {certifications.map(cert => (
                                <option key={cert.id} value={cert.id}>
                                    {cert.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Upload File</label>
                        <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            required
                            disabled={loading}
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                    </div>

                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Upload Document'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentUploadModal;