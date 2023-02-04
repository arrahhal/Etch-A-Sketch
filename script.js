const buttons = document.querySelectorAll('.btn');
const board = document.querySelector('div.board');

document.addEventListener('DOMContentLoaded', ()=>{
    createBoard(getComputedStyle(document.querySelector(":root")).getPropertyValue('--pixles'));
}, false);

buttons.forEach(btn => {
    btn.addEventListener('click', () =>{
        removeFocus();
        btn.classList.add('focus');
    })
})
function removeFocus(){
    buttons.forEach(btn => btn.classList.remove('focus'));
}

const range = document.querySelector('input[type="range"]')

range.addEventListener('change', () =>{
    createBoard(range.value);
})

function remvoeBoard(){
    const boardDivs = document.querySelectorAll('.board div');
    boardDivs.forEach(div => board.removeChild(div));
}

function createBoard(pixels){
    remvoeBoard();
    document.querySelector(':root').style.setProperty('--pixles', pixels);
    for(let i = 1; i <= pixels*pixels; i++){
        board.appendChild(document.createElement('div'));
    }
}