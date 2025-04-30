const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 10;

let player1 = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10, 
    height: 100 
};

let direction1 = "none";
let isKeyPressed1 = false;

function Player1draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
}

function moveplayer1() {
    if (isKeyPressed1) {
        switch (direction1) {
            case "up":
                player1.y -= tileSize;
                break;
            case "down":
                player1.y += tileSize;
                break;
        }
    }
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            direction1 = "up";
            isKeyPressed1 = true;
            break;
        case "ArrowDown":
            direction1 = "down";
            isKeyPressed1 = true;
            break;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        isKeyPressed1 = false;
    }
});

function wallCollision() {
    if (player1.y <= 0) {
        player1.y = 0;
    } else if (player1.y + player1.height >= canvas.height) {
        player1.y = canvas.height - player1.height;
    }
}

let direction2 = "none";
let isKeyPressed2 = false;

let player2 = {
    x: 740,
    y: canvas.height / 2 - 50,
    width: 10, 
    height: 100 
};

function Player2draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function moveplayer2() {
    if (isKeyPressed2) {
        switch (direction2) {
            case "up":
                player2.y -= tileSize;
                break;
            case "down":
                player2.y += tileSize;
                break;
        }
    }
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            direction2 = "up";
            isKeyPressed2 = true;
            break;
        case "s":
            direction2 = "down";
            isKeyPressed2 = true;
            break;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w" || event.key === "s") {
        isKeyPressed2 = false;
    }
});

function wallCollision2() {
    if (player2.y <= 0) {
        player2.y = 0;
    } else if (player2.y + player2.height >= canvas.height) {
        player2.y = canvas.height - player2.height;
    }
}



let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: 4
};

function drawBall() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.stroke();
}



function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.dy *= -1;
    }

    if (
        ball.x - ball.radius <= player1.x + player1.width &&
        ball.y >= player1.y &&
        ball.y <= player1.y + player1.height
    ) {
        ball.dx *= -1;
        ball.x = player1.x + player1.width + ball.radius;
    }

    if (
        ball.x + ball.radius >= player2.x &&
        ball.y >= player2.y &&
        ball.y <= player2.y + player2.height
    ) {
        ball.dx *= -1;
        ball.x = player2.x - ball.radius;
    }

    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        scoreCounter(); // Call the scoreCounter function to update the score
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
        ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
    }
}

let score = {
    player1: 0,
    player2: 0
};

function scoreCounter() {if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
    if (ball.x - ball.radius <= 0) {
        score.player2++;
    } else if (ball.x + ball.radius >= canvas.width) {
        score.player1++;
    }
    document.getElementById("ScoreBoard").innerHTML = `${score.player1} : ${score.player2}`;
    console.log(`Player 1: ${score.player1}, Player 2: ${score.player2}`);

}
}


function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    Player1draw(); 
    Player2draw();
    moveplayer2();
    moveplayer1();
    wallCollision(); 
    wallCollision2();
    drawBall();
    moveBall();
    requestAnimationFrame(updateGame); 
}

updateGame();
