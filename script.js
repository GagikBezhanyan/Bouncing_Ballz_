var Circle = /** @class */ (function () {
    function Circle(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = 0; // Initial velocity
        this.damp = 0.9; // Damping factor for bouncing
        this.color = "rgb(".concat(Math.random() * 255, ", ").concat(Math.random() * 255, ", ").concat(Math.random() * 255, ")");
    }
    return Circle;
}());
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lastTime = performance.now();
var circles = [];
// Function to get mouse position relative to the canvas
function getMousePosition(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
canvas.addEventListener('click', function (event) {
    var mousePos = getMousePosition(event);
    if (mousePos.x >= 0 && mousePos.x <= canvas.width && mousePos.y >= 0 && mousePos.y <= canvas.height && circles.length < 15) {
        circles.push(new Circle(mousePos.x, mousePos.y, Math.random() * 30 + 15));
        document.getElementById('circleCount').textContent = circles.length.toString();
    }
});
function draw(circle, ctx) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}
function update(deltaTime) {
    circles.forEach(function (circle) {
        circle.velocity += 0.25; // This is making an Earth-like gravity
        circle.y += circle.velocity;
        if (circle.y + circle.radius > canvas.height) {
            circle.y = canvas.height - circle.radius;
            circle.velocity *= -circle.damp; // this is making a reverse velocity with damping
        }
    });
}
function tick(currentTime) {
    var deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    update(deltaTime);
    circles.forEach(function (circle) {
        draw(circle, context);
    });
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
function resetCanvas() {
    circles = [];
    document.getElementById('circleCount').textContent = '0';
    context.clearRect(0, 0, canvas.width, canvas.height);
}
// Set canvas width and height based on its container width and height
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);
