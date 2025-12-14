// Script para criar o efeito de fundo animado (Partículas Conectadas)

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles;
const particleCount = 80;
const maxDistance = 100;

// Ajusta o tamanho do canvas
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); 

// Classe para a Partícula
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Velocidade lenta para um efeito de fundo suave
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebate nas bordas
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = '#58a6ff'; // Azul do ponto
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Cria a matriz de partículas
function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
createParticles();

// Loop principal da animação
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Conecta as partículas próximas com linhas
    for (let i = 0; i < particleCount; i++) {
        for (let j = i; j < particleCount; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                // Opacidade baseada na proximidade
                const opacity = 1 - (distance / maxDistance);
                ctx.strokeStyle = `rgba(63, 185, 80, ${opacity})`; // Verde da linha
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }

    // Desenha e atualiza as posições
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

// Inicia a Animação
animate();