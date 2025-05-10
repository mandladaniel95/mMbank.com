app.post('/make-deposit', async (req, res) => {
    try {
      const {
        amount,
        paymentMethod,
        cardNumber,
        expiryDate,
        cvv,
      } = req.body;
  
      // Validate deposit details
      if (!amount || !paymentMethod || !cardNumber || !expiryDate || !cvv) {
        return res.status(400).json({ error: 'Invalid deposit details' });
      }
  
      // Process deposit using payment gateway
      const paymentGateway = new PaymentGateway();
      const depositResponse = await paymentGateway.processDeposit({
        amount,
        paymentMethod,
        cardNumber,
        expiryDate,
        cvv,
      });
  
      // Update account balance
      if (depositResponse.success) {
        const account = await Account.findById(req.user.accountId);
        account.balance += amount;
        await account.save();
      }
  
      // Send confirmation
      const confirmationMessage = `Deposit of ${amount} made successfully`;
      await sendConfirmationMessage(req.user.email, confirmationMessage);
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to make deposit' });
    }
  });