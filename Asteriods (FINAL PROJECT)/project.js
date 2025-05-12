const canvas = document.getElementById('asteroidsCanvas');
const ctx = canvas.getContext('2d');

let asteroidImage = new Image();
asteroidImage.src = "pixil-frame-0.png"; // Ensure the correct relative path

let asteroidX = 0; // Starting X position
let asteroidY = 200; // Starting Y position
let asteroidSpeed = 1; // Speed of the asteroid

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

}



// Spaceship properties
let spaceship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 0,
    rotationSpeed: 0.2,
    acceleration: 0.2,
    bullets: []
};

// Draw the spaceship
function drawSpaceship() {
    ctx.save();
    ctx.translate(spaceship.x, spaceship.y);
    ctx.rotate(spaceship.angle - 17.3);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(0, -15); // Nose of the spaceship
    ctx.lineTo(10, 10); // Right wing
    ctx.lineTo(-10, 10); // Left wing
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Handle spaceship movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        spaceship.angle -= spaceship.rotationSpeed;
    } else if (e.key === 'ArrowRight') {
        spaceship.angle += spaceship.rotationSpeed;
    } else if (e.key === 'ArrowUp') {
        spaceship.speed += spaceship.acceleration;
    } else if (e.key === 'ArrowDown') {
        spaceship.speed -= spaceship.acceleration;
    } else if (e.key === ' ') {
        shootBullet();
    }
});

// Shoot bullets
function shootBullet() {
    let bulletSpeed = 7;
    spaceship.bullets.push({
        x: spaceship.x,
        y: spaceship.y,
        dx: bulletSpeed * Math.cos(spaceship.angle),
        dy: bulletSpeed * Math.sin(spaceship.angle)
    });
}

// Draw bullets
function drawBullets() {
    ctx.fillStyle = 'red';
    for (let i = 0; i < spaceship.bullets.length; i++) {
        let bullet = spaceship.bullets[i];
        ctx.fillRect(bullet.x - 2, bullet.y - 2, 4, 4);
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

        // Remove bullets that go off-screen
        if (
            bullet.x < 0 ||
            bullet.x > canvas.width ||
            bullet.y < 0 ||
            bullet.y > canvas.height
        ) {
            spaceship.bullets.splice(i, 1);
            i--;
        }
    }
}

// Check for collisions
function checkCollisions() {
    for (let i = 0; i < spaceship.bullets.length; i++) {
        let bullet = spaceship.bullets[i];
        if (
            bullet.x > asteroidX &&
            bullet.x < asteroidX + asteroidImage.width &&
            bullet.y > asteroidY &&
            bullet.y < asteroidY + asteroidImage.height
        ) {
            spaceship.bullets.splice(i, 1);
            i--;
            breakAsteroid();
        }
    }
}

// Break asteroid into smaller pieces
let asteroidPieces = [];
function breakAsteroid() {
    let pieceCount = 3; // Number of pieces
    for (let i = 0; i < pieceCount; i++) {
        asteroidPieces.push({
            x: asteroidX,
            y: asteroidY,
            dx: (Math.random() - 0.5) * 6,
            dy: (Math.random() - 0.5) * 6,
            size: asteroidImage.width / 2
        });
    }
    asteroidX = Math.random() * canvas.width; // Reset main asteroid
    asteroidY = Math.random() * canvas.height;
}

// Draw asteroid pieces
function drawAsteroidPieces() {
    for (let i = 0; i < asteroidPieces.length; i++) {
        let piece = asteroidPieces[i];
        ctx.drawImage(asteroidImage, piece.x, piece.y, piece.size, piece.size);
        piece.x += piece.dx;
        piece.y += piece.dy;

        // Wrap pieces around the screen
        if (piece.x > canvas.width) piece.x = 0;
        if (piece.x < 0) piece.x = canvas.width;
        if (piece.y > canvas.height) piece.y = 0;
        if (piece.y < 0) piece.y = canvas.height;
    }
}

// Update spaceship position
function updateSpaceship() {
    spaceship.x += spaceship.speed * Math.cos(spaceship.angle);
    spaceship.y += spaceship.speed * Math.sin(spaceship.angle);

    // Wrap spaceship around the screen
    if (spaceship.x > canvas.width) spaceship.x = 0;
    if (spaceship.x < 0) spaceship.x = canvas.width;
    if (spaceship.y > canvas.height) spaceship.y = 0;
    if (spaceship.y < 0) spaceship.y = canvas.height;
}

// Update and draw everything
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAsteroid();
    drawSpaceship();
    drawBullets();
    drawAsteroidPieces();
    checkCollisions();
    updateSpaceship();
    requestAnimationFrame(updateGame);
}

asteroidImage.onload = () => {
    updateGame(); // Start the game loop once the image is loaded
};