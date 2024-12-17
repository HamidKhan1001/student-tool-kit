const express = require('express');
const EducationLevel= require('../models/EducationLevel');
const FieldOfStudy= require('../models/FieldOfStudy');
const Country= require('../models/Country');
const Fee= require('../models/Fee');
const Questionnaire = require('../models/Questionnaire');
const User = require('../models/User');
const Certification = require('../models/Certification');
const University = require('../models/University');

const router = express.Router();

router.post('/submit', async (req, res) => {
    // console.log('Full session object:', req.session);
    // console.log('User ID from Questionnaire:', req.body.userId);
    const UserId = req.body.user_id;
    const fieldOfStudyId = req.body.fieldOfStudy;
    const countryId = req.body.country;
    const languageTest = req.body.languageTest;
    const feeId = req.body.fee;
    const educationLevelId = req.body.educationLevel;
    // const { userId, fieldOfStudyId, countryId, languageTest,feeId } = req.body;
    try {
        // First find matching universities
        // const matchingUniversities = await University.findAll({
        //     where: { country: country }
        // });

        // Create questionnaire entry
        const questionnaire = await Questionnaire.create({ UserId, fieldOfStudyId, countryId,languageTest, feeId, educationLevelId });

        // Return both questionnaire and universities data
        res.status(200).json({
            questionnaire,
            // universities: matchingUniversities
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/recommendations/:userId', async (req, res) => {
    const { userId } = req.params;
    let recommendations = [];
    try {
        const questionnaire = await Questionnaire.findOne({ 
            where: { userId: userId },
            order: [['createdAt', 'DESC']]
        });
        
        const matchingUniversities = await University.findAll({
            where: {
                countryId: questionnaire.countryId,
                fieldOfStudyId: questionnaire.fieldOfStudyId
            },
            include: [
                { model: Country },
                { model: FieldOfStudy },
                { model: Fee },
                { model: EducationLevel },
            ]
        });
        console.log('Matching Universities:',matchingUniversities);

        res.status(200).json({ 
            recommendations: matchingUniversities,
            questionnaire: questionnaire 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/profile-status/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        
        // Define what constitutes a "complete" profile
        const hasCompletedProfile = !!(
            user.firstName && 
            user.lastName && 
            user.birthdate && 
            user.contact && 
            user.city && 
            user.province && 
            user.gender
        );

        res.json({
            hasCompletedProfile
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/profile/update/:userId', async (req, res) => {
    const { userId } = req.params;
    const { 
        firstName, 
        lastName, 
        contact, 
        location, 
        city, 
        province, 
        gender, 
        birthdate 
    } = req.body;

    try {
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await user.update({
            firstName,
            lastName,
            contact,
            location,
            city,
            province,
            gender,
            birthdate: birthdate ? new Date(birthdate) : null
        });

        // Remove sensitive information if needed
        const userResponse = {
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            contact: updatedUser.contact,
            location: updatedUser.location,
            city: updatedUser.city,
            province: updatedUser.province,
            gender: updatedUser.gender,
            birthdate: updatedUser.birthdate
        };

        res.status(200).json({
            success: true,
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, birthdate, phone, city, province, gender } = req.body;

    try {
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await user.update({
            firstName,
            lastName,
            birthdate,
            contact: phone,
            city,
            province,
            gender,
            location: `${city}, ${province}`
        });

        res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/certifications', async (req, res) => {
    try {
        const certifications = await Certification.findAll();
        res.json(certifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch certifications' });
    }
});
router.get('/status/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const questionnaire = await Questionnaire.findOne({
            where: { userId: userId },
            include: [{
                model: FieldOfStudy,
                attributes: ['name']
            },
            {
                model: Country,
                attributes: ['name']
            },
            {
                model: User,
                attributes: ['name', 'email']
            },
            {
                model: Fee,
                attributes: ['amount']
            },
            {
                model: EducationLevel,
                attributes: ['name']
            },]

        });
        // console.log(questionnaire);
        
        res.json({
            hasAnswered: !!questionnaire,
            questionnaire: questionnaire
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add this route with your existing routes
router.put('/update/:id', async (req, res) => {
    console.log('Update request received:', req.body);
    console.log('Questionnaire ID:', req.params.id);

    const id = req.params.id;
    console.log('Questionnaire ID:', id);
    
    const { fieldOfStudyId, countryId, languageTest, feeId, educationLevelId } = req.body;

    try {
        const questionnaire = await Questionnaire.findByPk(id);
        if (!questionnaire) {
            return res.status(404).json({ error: 'Questionnaire not found' });
        }

        const result = await questionnaire.update({
            fieldOfStudyId,
            countryId,
            languageTest,
            feeId,
            educationLevelId
        });

        console.log('Update result:', result);

        const updatedQuestionnaire = await Questionnaire.findByPk(id, {
            include: [
                { model: FieldOfStudy },
                { model: Country },
                { model: Fee },
                { model: EducationLevel }
            ]
        });

        res.json(updatedQuestionnaire);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: error.message });
    }
});
router.get('/education-levels', async (req, res) => {
    try {
        const levels = await EducationLevel.findAll();
        console.log('Education levels:', levels);
        
        res.json(levels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/fields-of-study', async (req, res) => {
    try {
        const fields = await FieldOfStudy.findAll();
        res.json(fields);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/countries', async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/fees', async (req, res) => {
    try {
        const fees = await Fee.findAll();
        res.json(fees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
