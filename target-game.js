const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');

let score = 0;
let timeLeft = 30;
let gameInterval, targetTimeout;

function randomPosition(max) {
  return Math.floor(Math.random() * (max - 40)); // to keep target inside area
}

function showTarget() {
  const target = document.createElement('div');
  target.classList.add('target');
  target.style.top = `${randomPosition(300)}px`;
  target.style.left = `${randomPosition(300)}px`;

  target.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    target.remove();
  });

  gameArea.appendChild(target);

  // Remove target if not clicked
  targetTimeout = setTimeout(() => {
    target.remove();
  }, 700);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  startBtn.disabled = true;

  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    gameArea.innerHTML = '';
    showTarget();

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      clearTimeout(targetTimeout);
      gameArea.innerHTML = '';
      startBtn.disabled = false;
      alert(`Game Over! Your score is ${score}`);
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
