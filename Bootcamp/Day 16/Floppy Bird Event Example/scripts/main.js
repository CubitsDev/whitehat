var cvs = document.getElementById('canvas');
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var floor = new Image();
var pipeTop = new Image();
var pipeBottom = new Image();
bird.src = "./img/bird2.png"
bg.src = "./img/bg2.png"
floor.src = "./img/floor.png"
pipeTop.src = "./img/pipe-top.png";
pipeBottom.src = "./img/pipe-bottom.png";

var gap = 120;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

document.addEventListener("keydown", moveUp);

function moveUp(e) {
    if (e.code == 'ArrowUp') {
        bY -= 25;
    } else if (e.code == 'ArrowDown') {
        bY += 25;
    }
}

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: -200
}

function draw() {
    ctx.drawImage(bg, 0, 0)

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeTop.height + gap;
        ctx.drawImage(pipeTop,pipe[i].x,pipe[i].y);
        ctx.restore();
        ctx.drawImage(pipeBottom,pipe[i].x,pipe[i].y+constant)

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeTop.height) - pipeTop.height
            })
        }

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeTop.width && (bY <= pipe[i].y + pipeTop.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - floor.height){
            alert('Game Over! Score: ' + score)
            location.reload(); // reload the page
        }

        if (pipe[i].x == 5) {
            score++;
        }
    }

    ctx.drawImage(floor, 0, cvs.height - floor.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000"

    ctx.font = "20px Verdana"

    ctx.fillText("Score: " + score, 10, cvs.height-20);

    requestAnimationFrame(draw);
}

draw();