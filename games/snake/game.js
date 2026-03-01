/**
 * Snake Game
 * Pure canvas game — no dependencies.
 * Game loop uses setInterval so speed can be adjusted mid-game.
 */

const GRID      = 20;           // px per cell
const COLS      = 20;           // number of columns
const ROWS      = 20;           // number of rows
const CANVAS_PX = GRID * COLS;  // 400px

// ── DOM refs ────────────────────────────────────────────────────────────────
const canvas         = document.getElementById('gameCanvas');
const ctx            = canvas.getContext('2d');
const scoreEl        = document.getElementById('score');
const highScoreEl    = document.getElementById('highScore');
const overlay        = document.getElementById('overlay');
const overlayTitle   = document.getElementById('overlayTitle');
const overlayMessage = document.getElementById('overlayMessage');
const startBtn       = document.getElementById('startBtn');

// ── Game state ───────────────────────────────────────────────────────────────
let snake        = [];
let direction    = { x: 1, y: 0 };
let nextDir      = { x: 1, y: 0 };
let food         = { x: 0, y: 0 };
let score        = 0;
let highScore    = parseInt(localStorage.getItem('snakeHigh') ?? '0', 10);
let intervalId   = null;
let tickInterval = 150; // ms between ticks — decreases as score rises

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Draw a rounded rectangle path. Avoids ctx.roundRect() browser gaps. */
function roundedRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Pick a random grid position not occupied by the snake. */
function randomFoodPosition() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

// ── Core game logic ───────────────────────────────────────────────────────────

function init() {
  snake     = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  direction = { x: 1, y: 0 };
  nextDir   = { x: 1, y: 0 };
  score     = 0;
  tickInterval = 150;

  highScore = parseInt(localStorage.getItem('snakeHigh') ?? '0', 10);
  scoreEl.textContent    = score;
  highScoreEl.textContent = highScore;

  food = randomFoodPosition();
}

function tick() {
  direction = { ...nextDir };

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Wall collision
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
    return endGame();
  }

  // Self collision
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    return endGame();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    // Ate food
    score += 10;
    scoreEl.textContent = score;

    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = highScore;
      localStorage.setItem('snakeHigh', String(highScore));
    }

    // Speed up every 50 points, floor at 60ms
    if (score % 50 === 0) {
      tickInterval = Math.max(60, tickInterval - 10);
      restartLoop();
    }

    food = randomFoodPosition();
  } else {
    snake.pop();
  }

  draw();
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function draw() {
  // Background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, CANVAS_PX, CANVAS_PX);

  // Subtle grid
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth   = 0.5;
  for (let i = 0; i <= COLS; i++) {
    ctx.beginPath();
    ctx.moveTo(i * GRID, 0);
    ctx.lineTo(i * GRID, CANVAS_PX);
    ctx.stroke();
  }
  for (let j = 0; j <= ROWS; j++) {
    ctx.beginPath();
    ctx.moveTo(0, j * GRID);
    ctx.lineTo(CANVAS_PX, j * GRID);
    ctx.stroke();
  }

  // Food — glowing red circle
  const fx = food.x * GRID + GRID / 2;
  const fy = food.y * GRID + GRID / 2;
  ctx.shadowColor = '#f43f5e';
  ctx.shadowBlur  = 14;
  ctx.beginPath();
  ctx.arc(fx, fy, GRID / 2 - 2, 0, Math.PI * 2);
  ctx.fillStyle = '#f43f5e';
  ctx.fill();
  ctx.shadowBlur = 0;

  // Snake segments
  snake.forEach((seg, i) => {
    const x      = seg.x * GRID;
    const y      = seg.y * GRID;
    const isHead = i === 0;
    const radius = isHead ? 5 : 3;

    // Gradient from bright head → darker tail
    const lightness = Math.max(30, 55 - i * 1.2);
    ctx.fillStyle   = isHead ? '#34d399' : `hsl(158, 65%, ${lightness}%)`;
    ctx.shadowColor = isHead ? '#34d399' : 'transparent';
    ctx.shadowBlur  = isHead ? 14 : 0;

    roundedRect(x + 1, y + 1, GRID - 2, GRID - 2, radius);
    ctx.fill();
  });

  ctx.shadowBlur = 0;
}

// ── Loop control ──────────────────────────────────────────────────────────────

function startLoop() {
  intervalId = setInterval(tick, tickInterval);
}

function stopLoop() {
  clearInterval(intervalId);
  intervalId = null;
}

function restartLoop() {
  stopLoop();
  startLoop();
}

// ── Game lifecycle ────────────────────────────────────────────────────────────

function startGame() {
  overlay.classList.add('hidden');
  init();
  draw();
  restartLoop();
}

function endGame() {
  stopLoop();
  overlayTitle.textContent   = score > 0 ? 'Game Over' : 'Snake';
  overlayMessage.textContent = score > 0 ? `You scored ${score}` : 'Use arrow keys or WASD to move';
  startBtn.textContent       = score > 0 ? 'Play Again' : 'Start Game';
  overlay.classList.remove('hidden');
}

// ── Input ─────────────────────────────────────────────────────────────────────

const KEY_MAP = {
  ArrowUp:    { x:  0, y: -1 },
  ArrowDown:  { x:  0, y:  1 },
  ArrowLeft:  { x: -1, y:  0 },
  ArrowRight: { x:  1, y:  0 },
  w:          { x:  0, y: -1 },
  s:          { x:  0, y:  1 },
  a:          { x: -1, y:  0 },
  d:          { x:  1, y:  0 },
};

document.addEventListener('keydown', (e) => {
  const move = KEY_MAP[e.key];
  if (!move) return;

  // Prevent page scroll from arrow keys
  if (e.key.startsWith('Arrow')) e.preventDefault();

  // Disallow reversing into yourself
  const reversing = move.x === -direction.x && move.y === -direction.y;
  if (!reversing) nextDir = move;
});

startBtn.addEventListener('click', startGame);

// ── Boot ──────────────────────────────────────────────────────────────────────

// Draw an initial dark canvas so the page isn't blank behind the overlay
ctx.fillStyle = '#0f172a';
ctx.fillRect(0, 0, CANVAS_PX, CANVAS_PX);
highScoreEl.textContent = highScore;
