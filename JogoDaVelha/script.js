// Dodos iniciais

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

// Eventos

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Funções

function itemClick(event) {
    let item = event.target.getAttribute('data-item');

    if(playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2)

    player = (random === 0) ? 'X' : 'O';

    for(let i in square) {
        square[i] = '';
    };

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
       let item = document.querySelector(`div[data-item="${i}"]`);
        item.innerHTML = square[i];       
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = (player === 'X') ? 'O' : 'X';

    renderInfo();
    checkGame();
}

function checkGame() {
    if(checkWinnerFor('X')) {
        warning = 'O jogador X venceu!';
        playing = false;
    } else if(checkWinnerFor('O')) {
        warning = 'O jogador O venceu!';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu velha!';
        playing = false;
    } 
}

function checkWinnerFor(player) {
    let combinations = [
        'a1,a2,a3', 'b1,b2,b3', 'c1,c2,c3', // linhas
        'a1,b1,c1', 'a2,b2,c2', 'a3,b3,c3', // colunas
        'a1,b2,c3', 'c1,b2,a3' // diagonais
    ];

    for(let i in combinations) {
        let combination = combinations[i].split(',');
        
        if(combination.every(option => square[option] === player)) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
}