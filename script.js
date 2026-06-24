function irAlPoema() {
  document.body.style.transition = 'opacity 1.2s ease';
  document.body.style.opacity = '0';
  setTimeout(() => {
    window.location.href = 'poema.html';
  }, 1200);
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
document.body.appendChild(canvas);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

let particulas = [];
const colores = ['#c4a060','#d4b070','#a08040','#b89050','#e8c888','#9a7030'];

function initParticulas() {
  particulas = [];
  const cantidad = Math.min(50, Math.floor(window.innerWidth / 20));
  for (let i = 0; i < cantidad; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speedY: Math.random() * 0.25 + 0.05,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      color: colores[Math.floor(Math.random() * colores.length)],
      forma: Math.random() > 0.7 ? 'estrella' : 'circulo'
    });
  }
}

function dibujarEstrella(x, y, r, color, alpha) {
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angulo = (i * Math.PI) / 2;
    const x1 = x + Math.cos(angulo) * r * 2.2;
    const y1 = y + Math.sin(angulo) * r * 2.2;
    const xm = x + Math.cos(angulo + Math.PI / 4) * r * 0.6;
    const ym = y + Math.sin(angulo + Math.PI / 4) * r * 0.6;
    i === 0 ? ctx.moveTo(x1, y1) : ctx.lineTo(x1, y1);
    ctx.lineTo(xm, ym);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.fill();
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas.forEach(p => {
    p.twinkle += p.twinkleSpeed;
    p.y -= p.speedY;
    p.x += p.speedX;
    if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
    if (p.x < -5) p.x = canvas.width + 5;
    if (p.x > canvas.width + 5) p.x = -5;
    const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.twinkle));
    if (p.forma === 'estrella') {
      dibujarEstrella(p.x, p.y, p.r * 0.5, p.color, alpha * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });
  requestAnimationFrame(animar);
}

resize();
initParticulas();
animar();
window.addEventListener('resize', () => { resize(); initParticulas(); });
window.addEventListener('resize', () => { resize(); initParticulas(); });

// Música
function toggleMusica() {
  const audio = document.getElementById('musica');
  const btn = document.getElementById('btn-musica');
  const icono = document.getElementById('icono-musica');
  if (audio.paused) {
    audio.play();
    btn.classList.add('sonando');
    icono.textContent = '♫';
  } else {
    audio.pause();
    btn.classList.remove('sonando');
    icono.textContent = '♪';
  }
}