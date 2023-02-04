const buttons = document.querySelectorAll('.btn');
const board = document.querySelector('div.board');

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
    remvoeBoard();
    createBoard(range.value);
})

function remvoeBoard(){
    const boardDivs = document.querySelectorAll('.board div');
    boardDivs.forEach(div => board.removeChild(div));
}

function createBoard(pixels){
    document.querySelector(':root').style.setProperty('--pixles', pixels);
    for(let i = 1; i <= pixels*pixels; i++){
        board.appendChild(document.createElement('div'));
    }
}

