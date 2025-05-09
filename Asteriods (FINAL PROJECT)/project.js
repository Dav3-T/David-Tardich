const canvas = document.getElementById('asteroidsCanvas');
const ctx = canvas.getContext('2d');

let asteroidImage = new Image();
asteroidImage.src = "pixil-frame-0.png"; // Ensure the correct relative path

let asteroidX = 0; // Starting X position
let asteroidY = 200; // Starting Y position
let asteroidSpeed = 4; // Speed of the asteroid

function drawAsteroid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(asteroidImage, asteroidX, asteroidY); // Draw the asteroid
    asteroidX += asteroidSpeed; // Update the X position
    asteroidY += asteroidSpeed; // Update the Y position

    // Reset position if it moves off-screen
    if (asteroidX > canvas.width) {
        asteroidX = -asteroidImage.width;
    } else if (asteroidX < -asteroidImage.width) {
        asteroidX = canvas.width;
    }

    if (asteroidY > canvas.height) {
        asteroidY = -asteroidImage.height;
    } else if (asteroidY < -asteroidImage.height) {
        asteroidY = canvas.height;
    }

    requestAnimationFrame(drawAsteroid); // Loop the animation
}

asteroidImage.onload = () => {
  drawAsteroid(); // Start the animation once the image is loaded
};

