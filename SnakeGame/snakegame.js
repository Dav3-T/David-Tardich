const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContent("2d");

const titleSize = 20;
const gridSize = canvas.width / titleSize

let snake = [{x: 5, y: 5}];
let food = {x: 10, y: 10}
let direction = "right";

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * titleSize, segment.y * titleSize, titleSize);
    });
}

function moveSnake() {
    const head = {... snake[0] }

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }

    snake.unshift(head);

    if (head === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * gridSize)
    }
}