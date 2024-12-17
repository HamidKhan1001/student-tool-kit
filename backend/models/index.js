const express = require('express');
const { sequelize } = require('../config/database');  // Import the existing instance
const { DataTypes } = require('sequelize');
const UserCertification = require('./UserCertification');
const models = require('./associations');
const Questionnaire = require('./Questionnaire');
require('dotenv').config();
const University = require('./University');
const cors = require('cors');
// Initialize the express application

const app = express();
app.use(cors());
app.use(express.json());

// Test MySQL Connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Stripe Payment API Endpoint
app.post('/api/checkout', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'University Application Fee' },
                    unit_amount: 5000,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cancel`,
        });
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Payment initiation failed:', error);
        res.status(500).json({ error: 'Payment initiation failed.' });
    }
});

// Endpoint to Provide University Recommendations
app.post('/api/recommend', async (req, res) => {
    const { country } = req.body;
    console.log('Received country:', country);
    try {
        // Query universities from the database that match the provided country
        const recommendations = await University.findAll({
            where: {
                country: country
            }
        });

        res.status(200).json({ recommendations });
    } catch (error) {
        console.error('Failed to retrieve recommendations:', error);
        res.status(500).json({ error: 'Failed to retrieve recommendations' });
    }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
