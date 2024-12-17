const express = require('express');
const router = express.Router();
const { EducationLevel, FieldOfStudy, Country, Fee } = require('../models');

router.get('/education-levels', async (req, res) => {
    try {
        const levels = await EducationLevel.findAll();
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