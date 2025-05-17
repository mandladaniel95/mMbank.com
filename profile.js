// Get profile information from API or database
async function getProfile() {
  try {
    const response = await fetch('/get-profile');
    const profile = await response.json();

    // Display profile information on form
    document.getElementById('name').value = profile.name;
    document.getElementById('email').value = profile.email;
    document.getElementById('bio').value = profile.bio;
    document.getElementById('current-profile-picture').src = profile.profilePicture;
  } catch (error) {
    console.error(error);
  }
}

// Update profile information
async function updateProfile(event) {
  event.preventDefault();

  try {
    const formData = new FormData(document.getElementById('profile-form'));
    const response = await fetch('/update-profile', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('profile-status').textContent = 'Profile updated successfully';
    } else {
      document.getElementById('profile-status').textContent = 'Error updating profile';
    }
  } catch (error) {
    console.error(error);
  }
}

// Call getProfile function when page loads
document.addEventListener('DOMContentLoaded', getProfile);

// Add event listener to form submission
document.getElementById('profile-form').addEventListener('submit', updateProfile);