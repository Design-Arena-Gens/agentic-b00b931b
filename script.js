const canvas = document.getElementById('videoCanvas');
const ctx = canvas.getContext('2d');
const timestampEl = document.getElementById('timestamp');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function updateTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timestampEl.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
setInterval(updateTimestamp, 1000);
updateTimestamp();

let frame = 0;
const totalFrames = 300; // 10 seconds at 30fps
const fps = 30;

const tiger = {
    x: canvas.width * 0.35,
    y: canvas.height * 0.6,
    size: 100,
    angle: 0
};

const dog = {
    x: canvas.width * 0.65,
    y: canvas.height * 0.6,
    size: 60,
    angle: Math.PI
};

function drawScene() {
    const w = canvas.width;
    const h = canvas.height;
    
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGradient.addColorStop(0, '#1a1a1a');
    skyGradient.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h * 0.6);
    
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);
    
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 30]);
    ctx.beginPath();
    ctx.moveTo(0, h * 0.7);
    ctx.lineTo(w, h * 0.7);
    ctx.stroke();
    ctx.setLineDash([]);
    
    for (let i = 0; i < 4; i++) {
        const lightX = w * (0.2 + i * 0.2);
        const lightY = h * 0.1;
        
        ctx.strokeStyle = '#2a2a2a';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(lightX, lightY);
        ctx.lineTo(lightX, h * 0.6);
        ctx.stroke();
        
        const gradient = ctx.createRadialGradient(lightX, lightY + 20, 0, lightX, lightY + 20, 300);
        gradient.addColorStop(0, 'rgba(255, 200, 100, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(lightX - 300, lightY - 280, 600, 600);
        
        ctx.fillStyle = 'rgba(255, 220, 150, 0.8)';
        ctx.beginPath();
        ctx.arc(lightX, lightY + 20, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawTiger(x, y, size, wobble) {
    ctx.save();
    ctx.translate(x, y);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.ellipse(0, size * 0.4, size * 0.6, size * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#b8884d';
    ctx.fillRect(-size * 0.4, -size * 0.3, size * 0.8, size * 0.6);
    
    ctx.fillStyle = '#3a2a1a';
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(-size * 0.3 + i * size * 0.2, -size * 0.3, size * 0.08, size * 0.6);
    }
    
    ctx.fillStyle = '#c89858';
    ctx.beginPath();
    ctx.arc(-size * 0.5, -size * 0.4, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(-size * 0.6, -size * 0.6);
    ctx.lineTo(-size * 0.5, -size * 0.5);
    ctx.lineTo(-size * 0.55, -size * 0.45);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(-size * 0.4, -size * 0.6);
    ctx.lineTo(-size * 0.5, -size * 0.5);
    ctx.lineTo(-size * 0.45, -size * 0.45);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(-size * 0.55, -size * 0.45, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#b8884d';
    ctx.fillRect(-size * 0.3, size * 0.2, size * 0.12, size * 0.2);
    ctx.fillRect(-size * 0.1, size * 0.2, size * 0.12, size * 0.2);
    ctx.fillRect(size * 0.1, size * 0.2, size * 0.12, size * 0.2);
    ctx.fillRect(size * 0.3, size * 0.2, size * 0.12, size * 0.2);
    
    ctx.strokeStyle = '#b8884d';
    ctx.lineWidth = size * 0.08;
    ctx.beginPath();
    ctx.moveTo(size * 0.4, 0);
    ctx.quadraticCurveTo(size * 0.6, wobble * 20 - size * 0.2, size * 0.5, wobble * 30 - size * 0.4);
    ctx.stroke();
    
    ctx.restore();
}

function drawDog(x, y, size, wobble) {
    ctx.save();
    ctx.translate(x, y);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.ellipse(0, size * 0.4, size * 0.5, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(-size * 0.35, -size * 0.25, size * 0.7, size * 0.5);
    
    ctx.fillStyle = '#9b8365';
    ctx.beginPath();
    ctx.arc(size * 0.4, -size * 0.3, size * 0.25, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(size * 0.3, -size * 0.5);
    ctx.lineTo(size * 0.35, -size * 0.4);
    ctx.lineTo(size * 0.4, -size * 0.5);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(size * 0.4, -size * 0.5);
    ctx.lineTo(size * 0.45, -size * 0.4);
    ctx.lineTo(size * 0.5, -size * 0.5);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#7a6345';
    ctx.beginPath();
    ctx.ellipse(size * 0.5, -size * 0.25, size * 0.12, size * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#2a1a0a';
    ctx.beginPath();
    ctx.arc(size * 0.45, -size * 0.35, size * 0.04, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(-size * 0.25, size * 0.2, size * 0.1, size * 0.2);
    ctx.fillRect(-size * 0.05, size * 0.2, size * 0.1, size * 0.2);
    ctx.fillRect(size * 0.15, size * 0.2, size * 0.1, size * 0.2);
    ctx.fillRect(size * 0.25, size * 0.2, size * 0.1, size * 0.2);
    
    ctx.strokeStyle = '#8b7355';
    ctx.lineWidth = size * 0.06;
    ctx.beginPath();
    ctx.moveTo(-size * 0.35, 0);
    ctx.quadraticCurveTo(-size * 0.5, wobble * 15 - size * 0.15, -size * 0.45, wobble * 20 - size * 0.3);
    ctx.stroke();
    
    ctx.restore();
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let isAudioPlaying = false;

function playAmbientSound() {
    if (isAudioPlaying) return;
    isAudioPlaying = true;
    
    const rumbleOsc = audioContext.createOscillator();
    const rumbleGain = audioContext.createGain();
    rumbleOsc.type = 'sine';
    rumbleOsc.frequency.setValueAtTime(60, audioContext.currentTime);
    rumbleGain.gain.setValueAtTime(0.05, audioContext.currentTime);
    rumbleOsc.connect(rumbleGain);
    rumbleGain.connect(audioContext.destination);
    rumbleOsc.start();
    
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 10, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        noiseData[i] = Math.random() * 2 - 1;
    }
    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(200, audioContext.currentTime);
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.02, audioContext.currentTime);
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    noiseSource.start();
    noiseSource.loop = true;
    
    setTimeout(() => {
        const growlOsc = audioContext.createOscillator();
        const growlGain = audioContext.createGain();
        growlOsc.type = 'sawtooth';
        growlOsc.frequency.setValueAtTime(80, audioContext.currentTime);
        growlOsc.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.8);
        growlGain.gain.setValueAtTime(0.15, audioContext.currentTime);
        growlGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        growlOsc.connect(growlGain);
        growlGain.connect(audioContext.destination);
        growlOsc.start();
        growlOsc.stop(audioContext.currentTime + 0.8);
    }, 2000);
    
    setTimeout(() => {
        const barkOsc = audioContext.createOscillator();
        const barkGain = audioContext.createGain();
        barkOsc.type = 'square';
        barkOsc.frequency.setValueAtTime(400, audioContext.currentTime);
        barkOsc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
        barkGain.gain.setValueAtTime(0.12, audioContext.currentTime);
        barkGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        barkOsc.connect(barkGain);
        barkGain.connect(audioContext.destination);
        barkOsc.start();
        barkOsc.stop(audioContext.currentTime + 0.2);
    }, 4500);
    
    setTimeout(() => {
        const growlOsc2 = audioContext.createOscillator();
        const growlGain2 = audioContext.createGain();
        growlOsc2.type = 'sawtooth';
        growlOsc2.frequency.setValueAtTime(85, audioContext.currentTime);
        growlOsc2.frequency.exponentialRampToValueAtTime(65, audioContext.currentTime + 1);
        growlGain2.gain.setValueAtTime(0.18, audioContext.currentTime);
        growlGain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        growlOsc2.connect(growlGain2);
        growlGain2.connect(audioContext.destination);
        growlOsc2.start();
        growlOsc2.stop(audioContext.currentTime + 1);
    }, 6500);
    
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const barkOsc2 = audioContext.createOscillator();
                const barkGain2 = audioContext.createGain();
                barkOsc2.type = 'square';
                barkOsc2.frequency.setValueAtTime(380, audioContext.currentTime);
                barkOsc2.frequency.exponentialRampToValueAtTime(180, audioContext.currentTime + 0.15);
                barkGain2.gain.setValueAtTime(0.12, audioContext.currentTime);
                barkGain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                barkOsc2.connect(barkGain2);
                barkGain2.connect(audioContext.destination);
                barkOsc2.start();
                barkOsc2.stop(audioContext.currentTime + 0.15);
            }, i * 300);
        }
    }, 8000);
}

function animate() {
    if (frame >= totalFrames) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    drawScene();
    
    const wobble = Math.sin(frame * 0.1) * 0.5 + 0.5;
    
    tiger.x = canvas.width * 0.35;
    tiger.y = canvas.height * 0.65;
    dog.x = canvas.width * 0.65;
    dog.y = canvas.height * 0.65;
    
    drawTiger(tiger.x, tiger.y, tiger.size, wobble);
    drawDog(dog.x, dog.y, dog.size, wobble);
    
    if (Math.random() < 0.02) {
        ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.1)`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 100, Math.random() * 50);
    }
    
    frame++;
    setTimeout(() => requestAnimationFrame(animate), 1000 / fps);
}

document.addEventListener('click', () => {
    if (frame === 0) {
        playAmbientSound();
        animate();
    }
}, { once: true });

setTimeout(() => {
    if (frame === 0) {
        playAmbientSound();
        animate();
    }
}, 100);
