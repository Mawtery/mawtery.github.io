const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

// Resize canvas to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Track mouse
let mouse = { x: null, y: null };
window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = x;
    this.baseY = y;
    this.density = Math.random() * 30 + 1;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) { // mouse influence
      this.x -= dx / distance * 2;
      this.y -= dy / distance * 2;
    } else {
      // return to base position
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

// Create particles
let particlesArray = [];
function init() {
  particlesArray = [];
  let numberOfParticles = 200;
  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particlesArray.push(new Particle(x, y));
  }
}
init();

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
