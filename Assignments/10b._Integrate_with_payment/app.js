const express = require('express');
const dotenv = require('dotenv');
const stripe = require('stripe');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Stripe with the secret key
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the route for creating a checkout session
app.post('/create-checkout-session', async (req, res) => {
    const { price_id } = req.body;

    try {
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: price_id,  // Use price_id from the request body
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:8000/success.html',
            cancel_url: 'http://localhost:8000/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(400).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
