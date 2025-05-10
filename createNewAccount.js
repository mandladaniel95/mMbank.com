// Function to create new account
async function createAccount(accountDetails) {
    try {
      // Validate account details
      if (!accountDetails || !accountDetails.username || !accountDetails.password || !accountDetails.email) {
        throw new Error('Invalid account details');
      }
  
      // Send request to server-side API to create new account
      const response = await fetch('/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountDetails),
      });
  
      const data = await response.json();
      if (data.success) {
        // Account created successfully
        console.log('Account created successfully');
        // Redirect to login page
        window.location.href = '/login';
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      // Display error message to user
    }
  }
  
  // Example usage
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
      // Validate account details
      if (!username || !password || !email) {
        return res.status(400).json({ error: 'Invalid account details' });
      }
  
      // Check if account already exists
      const existingAccount = await Account.findOne({ username });
      if (existingAccount) {
        return res.status(400).json({ error: 'Account already exists' });
      }
  
      // Create new account
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
  
  // Function to hash password
  async function hashPassword(password) {
    // Use a library like bcrypt to hash the password
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }