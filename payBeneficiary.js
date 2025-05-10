// Function to pay beneficiaries
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
    beneficiaryId: 'BEN123',
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