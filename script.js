const gridDisplay = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const width = 10;
let score = 0;

const layout = [
    1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,1,0,0,0,0,1,
    1,0,1,0,1,0,1,1,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,1,1,0,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,1,1,0,1,1,0,1,0,1,
    1,0,0,0,0,1,0,0,0,1,
    1,0,1,1,0,0,0,1,0,1,
    1,1,1,1,1,1,1,1,1,1
];

const squares = [];

// Creazione mappa
function createBoard() {
    layout.forEach((value) => {
        const square = document.createElement('div');
        gridDisplay.appendChild(square);
        squares.push(square);
        if (value === 1) square.classList.add('wall');
        else if (value === 0) square.classList.add('dot');
    });
}
createBoard();

// Oggetti di gioco
const pacman = {
    currentIndex: 11,
    draw() { squares[this.currentIndex].classList.add('pacman'); },
    undraw() { squares[this.currentIndex].classList.remove('pacman'); }
};

const ghost = {
    currentIndex: 78,
    draw() { squares[this.currentIndex].classList.add('ghost'); },
    undraw() { squares[this.currentIndex].classList.remove('ghost'); }
};

pacman.draw();
ghost.draw();

// Movimento Pac-Man
function movePacman(e) {
    pacman.undraw();
    const key = e.key;
    let nextIndex = pacman.currentIndex;

    if (key === 'ArrowLeft' && pacman.currentIndex % width !== 0) nextIndex -= 1;
    else if (key === 'ArrowRight' && pacman.currentIndex % width < width - 1) nextIndex += 1;
    else if (key === 'ArrowUp' && pacman.currentIndex - width >= 0) nextIndex -= width;
    else if (key === 'ArrowDown' && pacman.currentIndex + width < width * width) nextIndex += width;

    if (!squares[nextIndex].classList.contains('wall')) {
        pacman.currentIndex = nextIndex;
    }

    pacman.draw();
    eatDot();
    checkGameOver();
}

// Logica Vittoria/Punti
function eatDot() {
    if (squares[pacman.currentIndex].classList.contains('dot')) {
        score++;
        scoreDisplay.innerHTML = score;
        squares[pacman.currentIndex].classList.remove('dot');
    }
    
    // Controlla se ci sono ancora puntini sulla mappa
    const remainingDots = squares.filter(sq => sq.classList.contains('dot')).length;
    if (remainingDots === 0) {
        alert("hai vinto");
        location.reload();
    }
}

// Movimento Fantasma
function moveGhost() {
    const directions = [-1, +1, -width, +width];
    const timerId = setInterval(() => {
        ghost.undraw();
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        if (!squares[ghost.currentIndex + direction].classList.contains('wall')) {
            ghost.currentIndex += direction;
        }
        
        ghost.draw();
        checkGameOver();
    }, 400);
}

// Logica Sconfitta
function checkGameOver() {
    if (pacman.currentIndex === ghost.currentIndex) {
        alert("hai perso");
        location.reload();
    }
}

document.addEventListener('keydown', movePacman);
moveGhost();