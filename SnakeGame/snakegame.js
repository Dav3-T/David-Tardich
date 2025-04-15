    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");

    const tileSize = 20;
    const gridSize = canvas.width / tileSize;

    let snake = [{ x: 5, y: 5 }];
    let food1 = { x: 10, y: 10 };
    let food2 = { x: 15, y: 15 };
    let direction = "right";

    function drawSnake() {
        ctx.fillStyle = "green";
        console.log("draw");
        snake.forEach(segment => {
            ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
        });
    }

    function drawFood1() {
        ctx.fillStyle = "red";
        ctx.fillRect(food1.x * tileSize, food1.y * tileSize,  tileSize, tileSize);
    }

    function drawFood2() {
        ctx.fillStyle = "red";
        ctx.fillRect(food2.x * tileSize, food2.y * tileSize,  tileSize, tileSize);
    }

    function moveSnake() {
        const head = { ...snake[0] };
        console.log("move");
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

        if (head.x === food1.x && head.y === food1.y) {
            generateFood();
        } else {
            snake.pop();
        }

        if (head.x === food2.x && head.y === food2.y) {
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood1() {
        food1 = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
        console.log("nom nom");
    }

    function generateFood2() {
        food2 = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
        console.log("nom nom");
    }

    function checkCollisions() {
        const head = snake[0];
        console.log("checK");
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            resetGame();
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
            }
        }
    }

    function resetGame() {
        alert("Game over! Restarting...");
        snake = [{ x: 5, y: 5}];
        direction = "right";
        generateFood();
    }

    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood1();
        drawFood2();
        moveSnake();
        checkCollisions();
    }

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    });
    //slowed down the game to make it easier
    setInterval(updateGame, 150);

    generateFood1();
    generateFood2();