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
// Function to logout user
async function logoutUser() {
  try {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error(error);
  }
}

// Example usage
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', async () => {
  await logoutUser();
});