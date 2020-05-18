let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let ball = {
    x: 20,
    y: 20,
    dx: 2,
    dy: 5,
    radius: 20
}
let paddle = {
    width: 70,
    height: 10,
    x: 0,
    y: canvas.height - 10,
    speed: 100
}
let isGameOver = false;
// bắt sự kiện người chơi
document.addEventListener('keydown', function(event) {
    console.log('kew-down');
    console.log(event);
    if (event.keyCode == 37) {
        paddle.x -= paddle.speed;
    } else if (event.keyCode == 39) {
        paddle.x += paddle.speed;
    }

});
// vẽ bóng
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}
// vẽ thanh chắn
function drawPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}
// cập nhập nhật tọa độ  quả bóng
function updateBallPostion() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}
// hàm xác định va chạm của quả bóng và đổi hướng chuyển động
function handleBall() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
    }
}
// hàm check gameover
function checkGameOver() {
    if (ball.y > canvas.height - ball.radius) {
        isGameOver = true;
    }
}
// hàm xử lý thanh chắn ko bị tràn ra khỏi ngoài canvas
function capnhatvitrithanhchan() {
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width;
    }
}
// hàm xử lý va chạm giữa quả bóng và thanh chắn
function vachamquabongthanhchan() {
    if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width && ball.y + ball.radius >= canvas.height - paddle.height) {
        ball.dy = -ball.dy;
    }
}
// hàm thông báo kết thúc game
function handGameover() {
    confirm('Game Over');
}
// hàm xử lý game logic
function draw() {
    // drawBall();
    if (!isGameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        updateBallPostion();
        capnhatvitrithanhchan();
        handleBall();
        vachamquabongthanhchan();
        checkGameOver();
        requestAnimationFrame(draw);
    } else {

        handGameover();
    }
}
draw();