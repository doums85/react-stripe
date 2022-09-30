const express = require('express');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Post request
app.post('/api/payment', cors(), async (req, res) => {
  let { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Payment test',
      payment_method: id,
      confirm: true,
    });

    console.log('Payment', payment);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error');
    res.json({ message: 'Payment failed', success: false });
  }
});

// Server configuration
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${process.env.STRIPE_SECRET_KEY}`));