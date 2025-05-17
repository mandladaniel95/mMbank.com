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
const backgroundContainer = document.querySelector('.background-container');
const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  // Add more images to the array
];

let currentImageIndex = 0;

function changeBackgroundImage() {
  backgroundContainer.style.backgroundImage = `url(${images[currentImageIndex]})`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}

setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds

changeBackgroundImage(); // Initialize the background image

