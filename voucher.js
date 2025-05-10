app.post('/buy-voucher', async (req, res) => {
    try {
      const {
        voucherType,
        amount,
        paymentMethod,
      } = req.body;
  
      // Validate voucher purchase details
      if (!voucherType || !amount || !paymentMethod) {
        return res.status(400).json({ error: 'Invalid voucher purchase details' });
      }
  
      // Process voucher purchase logic here
      // Generate voucher code
      const voucherCode = generateVoucherCode();
      // Save voucher details to database
      const voucher = new Voucher({
        voucherType,
        amount,
        voucherCode,
      });
      await voucher.save();
  
      res.json({ success: true, voucherCode });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to purchase voucher' });
    }
  });
  
  // Function to generate voucher code
  function generateVoucherCode() {
    // Generate a unique voucher code
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  }