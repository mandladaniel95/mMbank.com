const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/loginDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Function to login user
async function loginUser(username, password) {
  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to logout user
async function logoutUser(userId) {
  try {
    // Update user session or token
    console.log('User logged out successfully');
  } catch (error) {
    console.error(error);
  }
}

// Endpoint to login user
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await loginUser(username, password);
    if (user) {
      res.json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to login user' });
  }
});

// Endpoint to logout user
app.post('/logout', async (req, res) => {
  const userId = req.body.userId;
  try {
    await logoutUser(userId);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to logout user' });
  }
});