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