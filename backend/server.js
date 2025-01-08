import express from 'express';
import session from 'express-session';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from './models/User.js';
import Country from './models/Country.js';
import dotenv from 'dotenv';
import AdminJS from 'adminjs';
import * as AdminJSExpress from '@adminjs/express';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { connectDatabase } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import questionnaireRoutes from './routes/questionnaireRoutes.js';
import optionsRoutes from './routes/optionsRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import documentUploadRouter from './routes/documentUploads.js';
import FieldOfStudy from './models/FieldOfStudy.js';
import EducationLevel from './models/EducationLevel.js';
import Fee from './models/Fee.js';
import Certification from './models/Certification.js';
import University from './models/University.js';
import Questionnaire from './models/Questionnaire.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
// const AdminJS = require('adminjs')
// const AdminJSExpress = require('@adminjs/express')
// const AdminJSSequelize = require('@adminjs/sequelize')


const app = express();
// Register adapter
AdminJS.registerAdapter(AdminJSSequelize);
const adminJs = new AdminJS({
    resources: [{
      resource: User,
      options: {
        properties: {
          password: { isVisible: false },
          paymentStatus: { isVisible: true },
        }
      }
    },{
        resource: Country,  // Add the Country model first
        options: {
          properties: {
            name: { isVisible: true },
            code: { isVisible: true }
          }
        }
      },
      {
        resource: FieldOfStudy,  // Add the Country model first
        options: {
          properties: {
            name: { isVisible: true },
            code: { isVisible: true }
          }
        }
      },
      {
        resource: EducationLevel,  // Add the Country model first
        options: {
          properties: {
            name: { isVisible: true },
            code: { isVisible: true }
          }
        }
      },
      {
        resource: Fee,  // Add the Country model first
        options: {
          properties: {
            name: { isVisible: true },
            code: { isVisible: true }
          }
        }
      },
      {
        resource: Certification,  // Add the Country model first
        options: {
          properties: {
            name: { isVisible: true },
            code: { isVisible: true }
          }
        }
      },

      {
        resource: University,  // Add your University model
        options: {
          properties: {
            name: { isVisible: true },
            location: { isVisible: true },
            // Add other university fields
          }
        }
      }, {
        resource: Questionnaire,  // Add your Questionnaire model
        options: {
          properties: {
            name: { isVisible: true },
            location: { isVisible: true },
            // Add other university fields
          }
        }
      },
    ],
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    branding: {
        companyName: 'Admissions Express Admin',
        logo: false,
        softwareBrothers: false
      },
      locale: {
        translations: {
          actions: {
            logout: 'Logout'
          }
        }
      }
  })
  
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      try {
        const user = await User.findOne({ where: { email: email } });
        if (user && user.role === 'admin') {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },
    cookieName: 'adminjs',
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'complex-secure-string',
  }, null, {
    resave: false,
    saveUninitialized: true,
    store: session.MemoryStore(), // Add session store
  })
  
app.use(adminJs.options.rootPath, adminRouter);
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
// const path1 = require('path'); app.get('/uploads/documents/:filename', (req, res) => {     
//     const filePath = path1.join(__dirname, 'uploads/documents', req.params.filename);     
//     // Set inline to preview in the browser    
//     res.setHeader('Content-Disposition', 'inline'); 
//     res.setHeader('Content-Type', 'application/pdf'); // Ensure Content-Type is set
//     res.sendFile(filePath); 
// });
// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: 'https://app.admissionsexpress.com',
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
