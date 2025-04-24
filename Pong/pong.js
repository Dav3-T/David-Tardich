const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 10;


let player1 = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10, 
    height: 100 
};


function Player1draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
}

function moveplayer1() {
    console.log("move");
    switch (event.key) {
        case "up":
            player1--;
            break;
        case "down":
            player1++;
            break;
}
}
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;

    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    Player1draw(); 
    requestAnimationFrame(gameLoop); 
}
gameLoop();