
function init()
{
    cell_size = 32

    dead = new Audio();
    eat = new Audio();

    dead.src = "audio/dead.mp3";
    eat.src = "audio/eat.mp3";

    foodImg =  new Image();
    foodImg.src = "food.png"

    snake = {
        init_len: 5,
        color: "orange",
        cells:[],
        direction: "right",
        velocity:20,

        createSnake : function() {
            for(var i= this.init_len;i>=0;i--)
            {
                this.cells.push({x:i+3,y:0+10})
            }
        },
        drawSnake : function() {

            for(var i=0; i<this.cells.length;i++) {
                pen.fillStyle = this.color
                pen.fillRect(this.cells[i].x * cell_size, this.cells[i].y*cell_size,cell_size -2, cell_size - 2)
            }
            
        },
        updateSnake : function() {
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX==food.x && headY==food.y)
            {
                eat.play();
                food = randomFood();
            }
            else {
                this.cells.pop();
            }

            var nextX, nextY;
            if(snake.direction=="right") {
                
                nextX = headX +1
                nextY = headY;
            }
            else if(snake.direction=="left") {
                nextX =  headX -1;
                nextY = headY;
            }
            else if(snake.direction=="up") {
                nextX = headX;
                nextY = headY - 1;
            }
            else {
                nextX = headX;
                nextY = headY +1;
            }

            
            this.cells.unshift({x:nextX,y:nextY});

            var last_x = Math.round(W/cell_size);
            var last_y = Math.round(H/cell_size);

            if(this.cells[0].y<3 || this.cells[0].x<1 || this.cells[0].x > last_x-2 || this.cells[0].y>last_y-2 || this.snakeBite())
            {
                game_over = true;
            }
        },
        snakeBite : function() {

            let headX = this.cells[0].x;
            let headY = this.cells[0].y;

            for(let i =1;i<this.cells.length;i++)
            {
                if(headX==this.cells[i].x&&headY==this.cells[i].y)
                {
                    return true;
                }
            }
            return false
        }

    }
    game_over = false
    canvas = document.getElementById("mycanvas")
    W = canvas.width = 608
    H = canvas.height = 608
    pen = canvas.getContext('2d')
    game_over = false;

    snake.createSnake();

    function dirChanged(e){
        
        if(e.key=="ArrowRight") {
            snake.direction = "right"
        }
        else if(e.key=="ArrowLeft") {
            snake.direction = "left"
        }
        else if(e.key=="ArrowUp") {
            snake.direction = "up"
        }
        else if(e.key == "ArrowDown") {
            snake.direction = "down"
        }
    }

    food = randomFood()

    document.addEventListener('keydown', dirChanged)

}

function draw()
{
    pen.clearRect(0,0,W,H)
    snake.drawSnake()

    pen.fillStyle = food.color;
    pen.drawImage(foodImg,food.x * cell_size, food.y * cell_size, cell_size, cell_size)
}

function update() {

    snake.updateSnake()

}

function randomFood() {

    var foodX = Math.round((Math.random() *(W -cell_size)+1)/cell_size)
    var foodY = Math.round((Math.random()*(H-cell_size)+3)/cell_size)

    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    }

    return food;
}

function gameloop() {

    if(game_over)
    {
        dead.play()
        clearInterval(f);
        alert("Game Over")
    }

    draw();
    update();
}

init()
f = setInterval(gameloop, 200)