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
        case "W":
            direction2 = "up";
            isKeyPressed2 = true;
            break;
        case "S":
            direction2 = "down";
            isKeyPressed2 = true;
            break;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "W" || event.key === "S") {
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

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    Player1draw(); 
    Player2draw();
    moveplayer2();
    moveplayer1();
    wallCollision(); 
    wallCollision2();
    requestAnimationFrame(gameLoop); 
}
gameLoop();