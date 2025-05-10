
app.get('/get-account-details', async (req, res) => {
    try {
      const userId = req.user.id;
      const account = await Account.findOne({ userId });
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.json({
        balance: account.balance,
        accountNumber: account.accountNumber,
        accountType: account.accountType,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get account details' });
    }
  });