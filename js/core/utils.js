function pluralRu(n, one, two, five) {
    n = Math.abs(Number(n)) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return five;
    if (n1 > 1 && n1 < 5) return two;
    if (n1 === 1) return one;
    return five;
}
function getAnswerLetter(index) { return index < 26 ? String.fromCharCode(65 + index) : (index + 1) + '.'; }
function shuffleArray(arr) { const s = [...arr]; for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; } return s; }
function vibrate(pattern) { if ("vibrate" in navigator) navigator.vibrate(pattern); }
function launchConfetti() { const canvas = document.getElementById("confetti-canvas"); const ctx = canvas.getContext("2d"); canvas.width = window.innerWidth; canvas.height = window.innerHeight; const particles = []; const colors = ["#818CF8","#06B6D4","#10B981","#F59E0B","#EF4444","#EC4899","#A78BFA"]; for (let i = 0; i < 150; i++) { particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height, w: Math.random() * 10 + 5, h: Math.random() * 6 + 3, color: colors[Math.floor(Math.random() * colors.length)], speedY: Math.random() * 3 + 2, speedX: Math.random() * 2 - 1, rotation: Math.random() * 360, rotSpeed: Math.random() * 10 - 5, opacity: 1 }); } let frame = 0; const max = 180; function anim() { if (frame > max) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; } ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotSpeed; if (frame > max - 40) p.opacity -= 0.025; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation * Math.PI / 180); ctx.globalAlpha = Math.max(0, p.opacity); ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore(); }); frame++; requestAnimationFrame(anim); } anim(); }
function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
// [НАСТРОЙКИ] Настройки и тема