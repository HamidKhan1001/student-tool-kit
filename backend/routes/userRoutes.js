const express = require('express');
const jwt = require('jsonwebtoken');

const session = require('express-session');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.get('/session', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: 'No active session' });
    }
});
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name, email, password: hashedPassword });
         // Generate JWT token
         const token = jwt.sign(
            { id: user.id, email: user.email },
            'your-secret-key',  // Use environment variable in production
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            token,
              user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
              }});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
         // Generate JWT token
         const token = jwt.sign(
            { id: user.id, email: user.email },
            'your-secret-key',  // Use environment variable in production
            { expiresIn: '24h' }
        );

        req.session.userId = user.id;
        req.session.userName = user.name;
        req.session.userEmail = user.email;
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        req.session.contact = user.contact;
        req.session.location = user.location;
        req.session.city = user.city;
        req.session.province = user.province;
        req.session.gender = user.gender;
        req.session.birthdate = user.birthdate;
        
        console.log('Session after setting:', req.session);
        
        req.session.save((err) => {
            if (err) {
                console.log('Session save error:', err);
                return res.status(500).json({ error: 'Session save failed' });
            }
        
            res.status(200).json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    contact: user.contact,
                    location: user.location,
                    city: user.city,
                    province: user.province,
                    gender: user.gender,
                    birthdate: user.birthdate
                }
              });
          });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ 
            isAuthenticated: true,
            user: req.session.user 
        });
    } else {
        res.json({ isAuthenticated: false });
    }
});

module.exports = router;
