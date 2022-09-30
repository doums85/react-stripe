const express = require('express');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
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
    res.json({ message: `Payment failed : ${error}`, success: false });
  }
});

app.get('/', function (_, res) {
  app.use(express.static(path.resolve(__dirname, '../frontend', 'build')));
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

// Server configuration
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
