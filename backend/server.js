const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const documentUploadRouter = require('./routes/documentUploads');

const cors = require('cors');
const { connectDatabase } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const optionsRoutes = require('./routes/optionsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

require('dotenv').config();

const app = express();
// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads/documents');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Add this middleware before your static file serving
app.use('/uploads', (req, res, next) => {
    if (req.path.toLowerCase().endsWith('.pdf')) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
    }
    next();
});
// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: 'admissions-express-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));

app.use('/api/users', userRoutes);
app.use('/api/options',optionsRoutes);
app.use('/api/questionnaires', questionnaireRoutes);
// Use the document upload routes
app.use('/api/uploads',documentUploadRouter);
app.use('/api/payments', paymentRoutes);
connectDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
