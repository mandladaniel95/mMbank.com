const forgetPasswordForm = document.getElementById('forget-password-form');
const message = document.getElementById('message');

forgetPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('/forget-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    const result = await response.json();

    if (result.success) {
      message.innerHTML = 'Password reset link sent to your email';
    } else {
      message.innerHTML = 'Error sending password reset link';
    }
  } catch (error) {
    console.error(error);
    message.innerHTML = 'Error sending password reset link';
  }
});