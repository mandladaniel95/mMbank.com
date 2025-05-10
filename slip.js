app.get('/get-slip-details', async (req, res) => {
    try {
      const transactionId = req.query.transactionId;
      const slip = await Slip.findOne({ transactionId });
      if (!slip) {
        return res.status(404).json({ error: 'Slip not found' });
      }
      res.json({
        transactionId: slip.transactionId,
        date: slip.date,
        amount: slip.amount,
        description: slip.description,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get slip details' });
    }
  });
  