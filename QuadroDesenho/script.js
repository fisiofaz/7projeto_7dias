let currentColor = 'black';
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');
let isDrawing = false;

// Trocar cor ao clicar em uma cor da paleta
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

// Eventos de desenho
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

function mouseDownEvent(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function mouseMoveEvent(e) {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

function mouseUpEvent(e) {
    isDrawing = false;
    ctx.closePath();
}

// Limpar o canvas ao clicar no botão "Limpar Quadro"
document.querySelector('.clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, screen.width, screen.height);
});
