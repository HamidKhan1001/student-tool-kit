const express = require('express');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Certification = require('../models/Certification');
const  UserCertification = require('../models/UserCertification');
const upload = require('../config/upload');
const router = express.Router();

router.post('/upload-document', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const certificateId = req.body.certificateId;
        const userId = req.body.userId;

        // First, check if a document already exists for this user and certificate
        const existingDocument = await UserCertification.findOne({
            where: { 
                userId: userId, 
                certificateId: certificateId 
            }
        });

        if (existingDocument) {
            // Update existing document
            const updatedDocument = await existingDocument.update({
                imageName: req.file.originalname,
                imagePath: req.file.path
            });

            return res.status(200).json({
                message: 'Document updated successfully',
                document: updatedDocument
            });
        }

        // If no existing document, create new one
        const userCertification = await UserCertification.create({
            userId: userId,
            certificateId: certificateId,
            imageName: req.file.originalname,
            imagePath: req.file.path
        });

        res.status(201).json({
            message: 'Document uploaded successfully',
            document: userCertification
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            error: 'Failed to upload document',
            details: error.message 
        });
    }
});

// Get user's uploaded documents
router.get('/user-documents/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming you have authentication middleware
        
        const documents = await UserCertification.findAll({
            where: { userId }
        });

        res.json(documents);

    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch documents',
            details: error.message 
        });
    }
});

// Serve document
router.get('/view-document/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);

    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    const fileExtension = path.extname(filePath).toLowerCase();
    const mimeType = fileExtension === '.pdf' ? 'application/pdf' : 'image/jpeg';

    res.setHeader('Content-Type', mimeType);
    res.sendFile(filePath);
});
module.exports = router;