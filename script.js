const buttons = document.querySelectorAll('.btn:not([value="clear"])');
const board = document.querySelector('div.board');
const range = document.querySelector('input[type="range"]')
const gridTemplate = document.getElementById("grid-template");
const colorInput = document.querySelector('input[type="color"]');

let color = colorInput.value;
/* Add Focus for the current mode */
buttons.forEach(btn => btn.addEventListener('click', () => addFocus(btn)));

let intervalId;
function addFocus(btn){
    buttons.forEach(btn => btn.classList.remove('focus'));
    btn.classList.add('focus');
    if(btn.value === "pen"){
        clearInterval(intervalId); // stop interval calls when focus in not rainbow
        color = colorInput.value;
    }
    else if(btn.value === "eraser"){
        clearInterval(intervalId)
        color = "#FFF";
    }
    else if(btn.value === "rainbow")
    intervalId  = setInterval(() =>{
        color = randomColor();
    },10);

}

/* change the Pixles Grid inside the board according to input[type="range"] */
range.addEventListener('change', () =>{
    addNewGrid(range.value);
    displayGridTemplate(range.value);
    boardPixels = document.querySelectorAll('.board div');
})
range.addEventListener('mousemove', () =>{
    displayGridTemplate(range.value);
});

function removePreviousGrid(){
    board.textContent = '';
}
function addNewGrid(length){
    removePreviousGrid();
    document.querySelector(':root').style.setProperty('--pixles', length);
    for(let i = 1; i <= length*length; i++){
        board.appendChild(document.createElement('div'));
    }
}
// display the current grid template
function displayGridTemplate(side){
    gridTemplate.innerHTML = `${side} X ${side}`
}

document.addEventListener('DOMContentLoaded', ()=>{
    addNewGrid(getComputedStyle(document.querySelector(":root")).getPropertyValue('--pixles'));
    displayGridTemplate(range.value);
    boardPixels = document.querySelectorAll('.board div');
}, false);

board.addEventListener('DOMNodeInserted', () =>{
    const boardPixels = document.querySelectorAll('.board div');
    boardPixels.forEach(pixel => pixel.addEventListener('mousedown',handleClicks));
    boardPixels.forEach(pixel => pixel.addEventListener('mouseup',handleClicks));
    boardPixels.forEach(pixel => pixel.addEventListener('mouseover',handleClicks));
})

let flag = false;
function handleClicks(e){
    if(e.type === "mouseup")
        flag = false;
    if (e.type === "mousedown")
        flag = true;
    if(flag)
        e.target.style.backgroundColor = color;
}

// handl the color input and save its value to color var
colorInput.addEventListener('change', ()=>{
    color = colorInput.value;
    console.log(color);
})

function randomColor(){
    return `hsl(${360 * Math.random()},100%,${60 + 10 * Math.random()}%)`;
}

const clearBtn = document.querySelector('.btn[value="clear"]');
clearBtn.addEventListener('click',() => addNewGrid(range.value));