require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

if (!process.env.MYFATOORAH_API_KEY) {
  console.error('FATAL: MYFATOORAH_API_KEY is not set in .env');
  process.exit(1);
}

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 3000;


app.post('/api/generate-link', async (req, res) => {
  const { amount, currency, customerName } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid or missing amount' });
  }
  if (!currency || typeof currency !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing currency' });
  }
  if (!customerName || typeof customerName !== 'string' || customerName.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid or missing customer name' });
  }

  try {
    const response = await axios.post(
      'https://apitest.myfatoorah.com/v2/SendPayment',
      {
        CustomerName: customerName,
        NotificationOption: 'LNK', 
        InvoiceValue: Number(amount),
        DisplayCurrencyIso: currency,
        CallBackUrl: `${BASE_URL}/api/payment-success`,
        ErrorUrl: `${BASE_URL}/api/payment-failed`,
        Language: 'en'
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MYFATOORAH_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data || !response.data.IsSuccess) {
      return res.status(502).json({ error: 'Provider rejected request', details: response.data?.Message });
    }

    return res.status(200).json({
      success: true,
      paymentUrl: response.data.Data.InvoiceURL
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate payment link', details: error.response?.data?.Message });
  }
});


app.post('/api/verify-payment', async (req, res) => {
  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: 'Payment ID is required' });
  }

  try {
    const response = await axios.post(
      'https://apitest.myfatoorah.com/v2/GetPaymentStatus',
      {
        Key: paymentId,
        KeyType: 'PaymentId' //search using the id from the url
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MYFATOORAH_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const paymentData = response.data.Data;

    if (paymentData.InvoiceStatus === 'Paid') {
      
      return res.status(200).json({ 
        success: true, 
        message: 'Payment confirmed!', 
        transactionDetails: paymentData 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment not completed', 
        status: paymentData.InvoiceStatus 
      });
    }
  } catch (error) {
    console.error('Verify Error:', error.response?.data);
    return res.status(500).json({ error: 'Failed to verify payment' });
  }
});

//Callback URLs
app.get('/api/payment-success', (req, res) => {
  const paymentId = req.query.paymentId;
  
  res.send(`
    <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1 style="color: green;">Payment Successful! 🎉</h1>
        <p>Your Payment ID is: <strong>${paymentId}</strong></p>
        <p style="color: gray;"><i>(Send this ID to /api/verify-payment to confirm the order in the database)</i></p>
    </div>
  `);
});

app.get('/api/payment-failed', (req, res) => {
  res.send('<h1 style="color: red; text-align: center; margin-top: 50px;">Payment Failed or Cancelled ❌</h1>');
});

app.listen(PORT, () => console.log(`🚀 Payment Gateway API running on port ${PORT}`));
