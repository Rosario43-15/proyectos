const WIDTH = 10;
const HEIGHT = 10;
const DIRECTIONS = {
  'N': [-1, 0],
  'S': [1, 0],
  'E': [0, 1],
  'W': [0, -1]
};
const ARROWS = {
  'N': '↑',
  'S': '↓',
  'E': '→',
  'W': '←'
};

let circuit, playerPos, playerDir;
let moveQueue = [];
let isRunning = false;

function generateEasyMaze() {
  circuit = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(1));

  let x = 0;
  let y = 0;
  circuit[x][y] = 0;

  while (x < HEIGHT - 1 || y < WIDTH - 1) {
    if (x < HEIGHT - 1 && Math.random() > 0.5) x++;
    else if (y < WIDTH - 1) y++;
    circuit[x][y] = 0;
  }

  playerPos = [0, 0];
  playerDir = 'E';
}

function renderCircuit() {
  const circuitDiv = document.getElementById('circuit');
  circuitDiv.innerHTML = '';
  circuitDiv.style.gridTemplateColumns = `repeat(${WIDTH}, 30px)`;

  for (let x = 0; x < HEIGHT; x++) {
    for (let y = 0; y < WIDTH; y++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (circuit[x][y] === 1) cell.classList.add('wall');
      else cell.classList.add('path');
      if (x === 0 && y === 0) cell.classList.add('start');
      if (x === HEIGHT - 1 && y === WIDTH - 1) cell.classList.add('end');
      if (x === playerPos[0] && y === playerPos[1]) {
        cell.classList.add('player');
        cell.textContent = ARROWS[playerDir];
      }
      circuitDiv.appendChild(cell);
    }
  }
}

function queueMove(command) {
  if (!isRunning) {
      moveQueue.push(command);
      updateMoveQueueDisplay();
  }
}

function updateMoveQueueDisplay() {
  const moveQueueDisplay = document.getElementById('moveQueueDisplay');
  moveQueueDisplay.innerHTML = '';
  moveQueue.forEach((move, index) => {
      const moveItem = document.createElement('div');
      moveItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');
      moveItem.innerHTML = `
          <span>${move}</span>
          <i class="bi bi-trash-fill text-danger" style="cursor: pointer;" onclick="removeMove(${index})"></i>
      `;
      moveQueueDisplay.appendChild(moveItem);
  });
}


function removeMove(index) {
  moveQueue.splice(index, 1);
  updateMoveQueueDisplay();
}

function startSequence() {
  if (isRunning || moveQueue.length === 0) return;
  isRunning = true;
  executeMoves();
}

function executeMoves() {
  if (moveQueue.length === 0) {
      isRunning = false;
      return;
  }

  const command = moveQueue.shift();
  movePlayer(command);
  renderCircuit();
  updateMoveQueueDisplay();

  setTimeout(executeMoves, 500);
}

function movePlayer(command) {
  if (command === 'girar izquierda') {
      playerDir = { 'N': 'W', 'W': 'S', 'S': 'E', 'E': 'N' }[playerDir];
  } else if (command === 'girar derecha') {
      playerDir = { 'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N' }[playerDir];
  } else if (command === 'ir adelante') {
      const [dx, dy] = DIRECTIONS[playerDir];
      let [newX, newY] = [playerPos[0] + dx, playerPos[1] + dy];

      while (newX >= 0 && newX < HEIGHT && newY >= 0 && newY < WIDTH && circuit[newX][newY] === 0) {
          playerPos = [newX, newY];
          newX += dx;
          newY += dy;
      }
  }
}

function resetGame() {
  isRunning = false;
  moveQueue = [];
  playerPos = [0, 0];
  playerDir = 'E';
  generateEasyMaze();
  renderCircuit();
  updateMoveQueueDisplay();
}

generateEasyMaze();
renderCircuit();
