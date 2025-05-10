app.get('/get-balance', async (req, res) => {
    try {
      const account = await Account.findById(req.user.accountId);
      res.json({ balance: account.balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get balance' });
    }
  });