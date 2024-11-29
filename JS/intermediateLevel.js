const WIDTH = 11;
const HEIGHT = 11;
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

function generateMaze() {
    circuit = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(1));
    const stack = [[0, 0]];
    circuit[0][0] = 0;

    while (stack.length > 0) {
        const [x, y] = stack[stack.length - 1];
        const neighbors = [];

        for (const [dx, dy] of Object.values(DIRECTIONS)) {
            const nx = x + 2 * dx;
            const ny = y + 2 * dy;
            if (nx >= 0 && nx < HEIGHT && ny >= 0 && ny < WIDTH && circuit[nx][ny] === 1) {
                neighbors.push([dx, dy]);
            }
        }

        if (neighbors.length > 0) {
            const [dx, dy] = neighbors[Math.floor(Math.random() * neighbors.length)];
            const newX = x + dx;
            const newY = y + dy;
            const newXX = x + 2 * dx;
            const newYY = y + 2 * dy;

            circuit[newX][newY] = 0;
            circuit[newXX][newYY] = 0;
            stack.push([newXX, newYY]);
        } else {
            stack.pop();
        }
    }

    circuit[HEIGHT - 1][WIDTH - 1] = 0;
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
    generateMaze();
    renderCircuit();
    updateMoveQueueDisplay();
}

generateMaze();
renderCircuit();
