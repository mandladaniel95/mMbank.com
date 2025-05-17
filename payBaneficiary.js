
const express = require('express');
const app = express();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

// Payment processing logic
app.post('/process-payment', async (req, res) => {
  try {
    const {
      beneficiaryName,
      beneficiaryBank,
      beneficiaryAccountNumber,
      amount,
      paymentMethod,
    } = req.body;

    // Validate payment details
    if (!beneficiaryName || !beneficiaryBank || !beneficiaryAccountNumber || !amount || !paymentMethod) {
      return res.status(400).json({ error: 'Invalid payment details' });
    }

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'zar',
      payment_method_types: [paymentMethod],
    });

    // Confirm the payment intent
    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method_data: {
        type: paymentMethod,
      },
    });

    
    res.json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
});

async function payBeneficiaries(beneficiaryDetails) {
    try {
      // Validate beneficiary details
      if (!beneficiaryDetails || !beneficiaryDetails.beneficiaryId || !beneficiaryDetails.amount) {
        throw new Error('Invalid beneficiary details');
      }
  
      // Process payment logic here
      const paymentResponse = await processPayment(beneficiaryDetails);
      if (!paymentResponse.success) {
        throw new Error('Payment failed');
      }
  
      // Update beneficiary payment status
      const beneficiary = await Beneficiary.findById(beneficiaryDetails.beneficiaryId);
      beneficiary.paymentStatus = 'paid';
      await beneficiary.save();
  
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }
  
  // Function to process payment
  async function processPayment(beneficiaryDetails) {
    try {
      // Process payment using payment gateway or bank API
      const paymentGatewayResponse = await paymentGateway.pay(beneficiaryDetails);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }
  
  // Example usage
  const beneficiaryDetails = {
    beneficiaryId: 'Mandla123',
    amount: 100.00,
  };
  
  payBeneficiaries(beneficiaryDetails)
    .then(response => {
      if (response.success) {
        console.log('Beneficiary paid successfully');
      } else {
        console.error('Failed to pay beneficiary:', response.error);
      }
    })
    .catch(error => console.error(error));

  
  app.post('/pay-beneficiary', async (req, res) => {
    try {
      const beneficiaryDetails = req.body;
      const paymentResponse = await payBeneficiaries(beneficiaryDetails);
      if (paymentResponse.success) {
        res.json({ success: true });
      } else {
        res.status(500).json({ error: paymentResponse.error });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to pay beneficiary' });
    }
  });