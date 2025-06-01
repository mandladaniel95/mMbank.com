// Payment class
class Payment {
  constructor(amount, paymentMethod) {
    this.amount = amount;
    this.paymentMethod = paymentMethod;
  }

  // Process payment
  processPayment() {
    // Validate payment information
    if (!this.validatePaymentInfo()) {
      return false;
    }

    // Send payment request to server
    fetch('/make-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: this.amount,
        paymentMethod: this.paymentMethod,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Payment successful!');
        } else {
          console.log('Payment failed.');
        }
      })
      .catch((error) => console.error(error));
  }

  // Validate payment information
  validatePaymentInfo() {
    // Validate amount
    if (this.amount <= 0) {
      console.log('Invalid amount.');
      return false;
    }

    // Validate payment method
    if (!this.paymentMethod) {
      console.log('Invalid payment method.');
      return false;
    }

    return true;
  }
}

// Example usage
const payment = new Payment(100.00, 'Credit Card');
payment.processPayment();

const express = require('express');
const app = express();

app.post('/make-payment', (req, res) => {
  const amount = req.body.amount;
  const paymentMethod = req.body.paymentMethod;

  // Process payment using payment gateway API
  // ...

  res.json({ success: true });
});




const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

app.post('/make-payment', (req, res) => {
  const amount = req.body.amount;
  const paymentMethod = req.body.paymentMethod;

  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: paymentMethod,
  })
    .then((charge) => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.json({ success: false });
    });
});




// Payment retrieval function
function retrievePayment(paymentId) {
  // Send request to payment API
  fetch(`/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(`Payment retrieved successfully: ${data.payment}`);
        // Process payment data
      } else {
        console.log('Error retrieving payment:', data.error);
      }
    })
    .catch((error) => console.error(error));
}

// Example usage
const paymentId = 'PAY-5284 9730 2961 7424';
retrievePayment(paymentId);
