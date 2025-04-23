    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");

    const tileSize = 20;
    const gridSize = canvas.width / tileSize;


    let count = 0; // Global variable to track the score

function counter() {
    count++; // Increment the count
    document.getElementById("appleCounter").innerHTML = `score: ${count}`;
    console.log("Apple eaten: " + count);
    {}
}


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
            generateFood1();
            counter();
        } else if (head.x === food2.x && head.y === food2.y) {
            generateFood2();
            counter();
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
        if ( head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize ) {
            resetGame();
            count = 0; // Reset the score
            document.getElementById("appleCounter").innerHTML = `score: ${count}`;
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
                count = 0;
                document.getElementById("appleCounter").innerHTML = `score: ${count}`;
            }
        }
    }

    function resetGame() {
        alert("Game over! Restarting...");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake = [{ x: 5, y: 5}];
        direction = "right";
        generateFood1();
        generateFood2();
    }

    function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Move the snake
        moveSnake();
    
        // Redraw the snake and food
        drawSnake();
        drawFood1();
        drawFood2();
        checkCollisions();
        // Call the game loop again after a delay
        setTimeout(gameLoop, 100); // Adjust the delay for game speed
    }
    
    // Start the game loop
    gameLoop();

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
    

    generateFood1();
    generateFood2();

    