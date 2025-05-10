
// Function to login user
async function loginUser(username, password) {
  try {
    // Validate username and password
    if (!username || !password) {
      throw new Error('Invalid username or password');
    }

    // Send login request to server-side API
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (data.success) {
      // Save token to local storage
      localStorage.setItem('token', data.token);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error(error);
    // Display error message to user
  }
}

// Example usage
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  await loginUser(username, password);
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


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validate username and password
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Generate token
    const token = generateToken();
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Function to generate token
function generateToken() {
  // Generate a unique token
  return Math.random().toString(36).substr(2, 10).toUpperCase();
}
const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginButton.addEventListener('click', async () => {
  try {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = '/home'; // Redirect to home screen
    } else {
      console.error('Invalid login credentials');
    }
  } catch (error) {
    console.error(error);
  }
});