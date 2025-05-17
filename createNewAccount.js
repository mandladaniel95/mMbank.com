async function createAccount(accountDetails) {
    try {
      if (!accountDetails || !accountDetails.username || !accountDetails.password || !accountDetails.email) {
        throw new Error('Invalid account details');
      }
  
      const response = await fetch('/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountDetails),
      });
  
      const data = await response.json();
      if (data.success) {
        console.log('Account created successfully');
        window.location.href = '/login';
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const createAccountForm = document.getElementById('create-account-form');
  createAccountForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const accountDetails = {
      username,
      password,
      email,
    };
    await createAccount(accountDetails);
  });
  

  app.post('/create-account', async (req, res) => {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return res.status(400).json({ error: 'Invalid account details' });
      }
  
      const existingAccount = await Account.findOne({ username });
      if (existingAccount) {
        return res.status(400).json({ error: 'Account already exists' });
      }
  
      const newAccount = new Account({
        username,
        password: await hashPassword(password),
        email,
      });
      await newAccount.save();
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create account' });
    }
  });
  
  async function hashPassword(password) {
    
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }