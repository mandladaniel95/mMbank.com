app.post('/send-cash', async (req, res) => {
    try {
      const {
        recipientEmail,
        amount,
        message,
      } = req.body;
  
      // Validate cash send details
      if (!recipientEmail || !amount) {
        return res.status(400).json({ error: 'Invalid cash send details' });
      }
  
      // Check if sender has sufficient balance
      const sender = await User.findById(req.user.id);
      if (sender.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      // Process cash send logic here
      // Update sender's balance
      sender.balance -= amount;
      await sender.save();
  
      // Send cash to recipient
      const recipient = await User.findOne({ email: recipientEmail });
      if (recipient) {
        recipient.balance += amount;
        await recipient.save();
      } else {
        // Send email to recipient with cash pickup instructions
        // ...
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send cash' });
    }
  });