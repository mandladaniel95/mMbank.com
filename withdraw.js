app.post('/make-withdrawal', async (req, res) => {
    try {
      const {
        amount,
        paymentMethod,
      } = req.body;
  
      // Validate withdrawal details
      if (!amount || !paymentMethod) {
        return res.status(400).json({ error: 'Invalid withdrawal details' });
      }
  
      // Check if account balance is sufficient
      const account = await Account.findById(req.user.accountId);
      if (account.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      // Process withdrawal logic here
      // Update account balance
      account.balance -= amount;
      await account.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to make withdrawal' });
    }
  });
  