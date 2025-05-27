//funny variable library!!

const canvas = document.getElementById('asteroidsCanvas');
const ctx = canvas.getContext('2d');

let asteroidImage = new Image();
asteroidImage.src = "pixil-frame-0.png";

let spaceshipExplosion = new Image();
spaceshipExplosion.src = "pixil-frame-0 (1).png";

let asteroidX = 0; 
let asteroidY = 200; 
let asteroidSpeed = .5; 
let score = 0; 
 
//draws asteroid and makes it wrap around the screen

function drawAsteroid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(asteroidImage, asteroidX, asteroidY); 
    asteroidX += asteroidSpeed; 
    asteroidY += asteroidSpeed; 

   
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


let asteroids = [];


function spawnAsteroids() {
    asteroids = [];
    
        asteroids.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            size: asteroidImage.width
        });
    
}

function drawAsteroids() {
    for (let i = 0; i < asteroids.length; i++) {
        let asteroid = asteroids[i];
        ctx.drawImage(asteroidImage, asteroid.x, asteroid.y, asteroid.size, asteroid.size);
        asteroid.x += asteroid.dx;
        asteroid.y += asteroid.dy;

        if (asteroid.x > canvas.width) asteroid.x = 0;
        if (asteroid.x < 0) asteroid.x = canvas.width;
        if (asteroid.y > canvas.height) asteroid.y = 0;
        if (asteroid.y < 0) asteroid.y = canvas.height;
    }
}

function checkAsteroidCollisions() {
    for (let i = 0; i < spaceship.bullets.length; i++) {
        let bullet = spaceship.bullets[i];
        for (let j = 0; j < asteroids.length; j++) {
            let asteroid = asteroids[j];
            if (
                bullet.x > asteroid.x &&
                bullet.x < asteroid.x + asteroid.size &&
                bullet.y > asteroid.y &&
                bullet.y < asteroid.y + asteroid.size
            ) {
                spaceship.bullets.splice(i, 1);
                asteroids.splice(j, 1);
                i--;
                breakAsteroid(asteroid);
                break;
            }
        }
    }

    if (asteroids.length === 0) {
        round++;
        spawnAsteroids();
    }
}

function breakAsteroid(asteroid) {
    let pieceCount = 3;
    for (let i = 0; i < pieceCount; i++) {
        asteroidPieces.push({
            x: asteroid.x,
            y: asteroid.y,
            dx: (Math.random() - 0.5) * 6,
            dy: (Math.random() - 0.5) * 6,
            size: asteroid.size / 2
        });
    }
}

//define spaceship object

let spaceship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 0,
    rotationSpeed: 0.3,
    acceleration: 0.3,
    bullets: [],
};


//draws spaceship

function drawSpaceship() {
    ctx.save();
    ctx.translate(spaceship.x, spaceship.y);
    ctx.rotate(spaceship.angle - 17.29);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(0, -15); 
    ctx.lineTo(10, 10); 
    ctx.lineTo(-10, 10); 
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

//controls spaceship movement and shooting

//now i did something a bit strange. In order to turn, you must be moving. 
//This is to prevent 'cheesing' the game by staying in one spot

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        spaceship.angle -= spaceship.rotationSpeed * (spaceship.speed / 5);
    } else if (e.key === 'ArrowRight') {
        spaceship.angle += spaceship.rotationSpeed * (spaceship.speed / 5);
    } else if (e.key === 'ArrowUp') {
        spaceship.speed += spaceship.acceleration;
    } else if (e.key === 'ArrowDown') {
        spaceship.speed -= spaceship.acceleration;
    } else if (e.key === ' ') {
        shootBullet();
    } if (spaceship.speed > 0) {
        spaceship.speed -= spaceship.acceleration/4;
    }
});

//draws the bullets and makes them move

function shootBullet() {
    let bulletSpeed = 7;
    spaceship.bullets.push({
        x: spaceship.x,
        y: spaceship.y,
        dx: bulletSpeed * Math.cos(spaceship.angle),
        dy: bulletSpeed * Math.sin(spaceship.angle)
    });
}


function drawBullets() {
    ctx.fillStyle = 'red';
    for (let i = 0; i < spaceship.bullets.length; i++) {
        let bullet = spaceship.bullets[i];
        ctx.fillRect(bullet.x - 2, bullet.y - 2, 4, 4);
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

       
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

//checks ALL collisions

function checkCollisions() {
    // Check bullet collisions with asteroid pieces
    for (let i = 0; i < spaceship.bullets.length; i++) {
        let bullet = spaceship.bullets[i];

        // Check collision with the large asteroid
        if (
            bullet.x > asteroidX &&
            bullet.x < asteroidX + asteroidImage.width &&
            bullet.y > asteroidY &&
            bullet.y < asteroidY + asteroidImage.height
        ) {
            spaceship.bullets.splice(i, 1);
            i--;
            breakAsteroid();
            continue;
        }

        // Check collision with asteroid pieces
        for (let j = 0; j < asteroidPieces.length; j++) {
            let piece = asteroidPieces[j];
            if (
                bullet.x > piece.x &&
                bullet.x < piece.x + piece.size &&
                bullet.y > piece.y &&
                bullet.y < piece.y + piece.size
            ) {
                score += 100;
                document.getElementById("Score").innerHTML = `${score}`;
                console.log("Collision detected!");
                spaceship.bullets.splice(i, 1);
                asteroidPieces.splice(j, 1);
                i--;
                break;
            }
        }
    }

    // Check spaceship collision with asteroid pieces
    for (let j = 0; j < asteroidPieces.length; j++) {
        let piece = asteroidPieces[j];
        if (
            spaceship.x < piece.x + piece.size &&
            spaceship.x + spaceship.width > piece.x &&
            spaceship.y < piece.y + piece.size &&
            spaceship.y + spaceship.height > piece.y
        ) {
            ctx.drawImage(
                spaceshipExplosion,
                spaceship.x - spaceshipExplosion.width / 2,
                spaceship.y - spaceshipExplosion.height / 2
            );

            setTimeout(() => {
                alert("Game Over! Your score: " + score);
            }, 500);
            document.location.reload();

            return;
        }
    }

    // Check spaceship collision with the large asteroid
    if (
        spaceship.x > asteroidX &&
        spaceship.x < asteroidX + asteroidImage.width &&
        spaceship.y > asteroidY &&
        spaceship.y < asteroidY + asteroidImage.height
    ) {
        ctx.drawImage(
            spaceshipExplosion,
            spaceship.x - spaceshipExplosion.width / 2,
            spaceship.y - spaceshipExplosion.height / 2
        );

        setTimeout(() => {
            alert("Game Over! Your score: " + score);
        }, 500);
        document.location.reload();

        return;
    }
}

//creates smaller "peices" of asteroids and makes them move

let asteroidPieces = [];
function breakAsteroid() {
    let pieceCount = 3; 
    for (let j = 0; j < pieceCount; j++) {
        asteroidPieces.push({
            x: asteroidX,
            y: asteroidY,
            dx: (Math.random() - 0.5) * 6,
            dy: (Math.random() - 0.5) * 6,
            size: asteroidImage.width / 2
        });
    }
    asteroidX = Math.random() * canvas.width; 
    asteroidY = Math.random() * canvas.height;
}


function drawAsteroidPieces() {
    for (let i = 0; i < asteroidPieces.length; i++) {
        let piece = asteroidPieces[i];
        ctx.drawImage(asteroidImage, piece.x, piece.y, piece.size, piece.size);
        piece.x += piece.dx;
        piece.y += piece.dy;

      
        if (piece.x > canvas.width) piece.x = 0;
        if (piece.x < 0) piece.x = canvas.width;
        if (piece.y > canvas.height) piece.y = 0;
        if (piece.y < 0) piece.y = canvas.height;

        
    }
}


function breakAsteroid() {
    let pieceCount = 3; 
    for (let i = 0; i < pieceCount; i++) {
        asteroidPieces.push({
            x: asteroidX,
            y: asteroidY,
            dx: (Math.random() - 0.5) * 6,
            dy: (Math.random() - 0.5) * 6,
            size: asteroidImage.width / 2
        });
    }
    asteroidX = Math.random() * canvas.width; 
    asteroidY = Math.random() * canvas.height;


}

//makes spaceship move and wrap around the screen

function updateSpaceship() {
    spaceship.x += spaceship.speed * Math.cos(spaceship.angle);
    spaceship.y += spaceship.speed * Math.sin(spaceship.angle);

   
    if (spaceship.x > canvas.width) spaceship.x = 0;
    if (spaceship.x < 0) spaceship.x = canvas.width;
    if (spaceship.y > canvas.height) spaceship.y = 0;
    if (spaceship.y < 0) spaceship.y = canvas.height;
}

//this is the score. it changes the background color depending on your points

function scoreThing() { 
    if (score == 1000) 
    {
        canvas.style.backgroundColor = "lightblue";

    }
    if (score == 5000) 
    {
        canvas.style.backgroundColor = "grey";
    }
    if (score == 10000) 
    {
        canvas.style.backgroundColor = "yellow";
    }
} 
//updates the game... obviously

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAsteroid();
    drawSpaceship();
    drawBullets();
    drawAsteroidPieces();
    checkCollisions();
    scoreThing();
    updateSpaceship();
    requestAnimationFrame(updateGame);
    console.log(spaceship.x, spaceship.y);
    console.log(asteroidPieces);
}

asteroidImage.onload = () => {
    updateGame(); 
};