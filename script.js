const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function randomColorRGB() {
  return `rgb(${rand(200,255)}, ${rand(0,100)}, ${rand(100,255)})`;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class Heart {
  constructor() {
    this.x = rand(0, canvas.width);
    this.y = canvas.height + rand(0, 100);
    this.size = rand(10, 30);
    this.speed = Math.random() * 1.5 + 0.5;
    this.color = randomColorRGB();
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = canvas.height + rand(0, 100);
      this.x = rand(0, canvas.width);
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                      this.x + this.size * 1.5, this.y + this.size / 2,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size * 1.5, this.y + this.size / 2,
                      this.x - this.size / 2, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
  }
}

function createHearts(num) {
  for (let i = 0; i < num; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart) => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animate);
}

createHearts(100);
animate();
