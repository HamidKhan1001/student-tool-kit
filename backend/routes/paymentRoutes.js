const express = require('express');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/checkout', async (req, res) => {
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
        res.status(500).json({ error: 'Payment initiation failed' });
    }
});

module.exports = router;
