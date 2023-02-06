const buttons = document.querySelectorAll('.btn:not([value="clear"])');
const board = document.querySelector('div.board');



/* Add Focus for the current mode */
buttons.forEach(btn => {
    btn.addEventListener('click', () =>{
        removeFocus();
        btn.classList.add('focus');
        handleFocusButton(btn);
    })
})

function removeFocus(){
    buttons.forEach(btn => btn.classList.remove('focus'));
}



/* change the Pixles Grid inside the board according to input[type="range"] */
const range = document.querySelector('input[type="range"]')

range.addEventListener('change', () =>{
    addNewGrid(range.value);
    displayGridTemplate(range.value);
    boardPixels = document.querySelectorAll('.board div');
})
function removePreviousGrid(){
    boardPixels = document.querySelectorAll('.board div');
    boardPixels.forEach(div => board.removeChild(div));
}
function addNewGrid(pixels){
    removePreviousGrid();
    document.querySelector(':root').style.setProperty('--pixles', pixels);
    for(let i = 1; i <= pixels*pixels; i++){
        board.appendChild(document.createElement('div'));
    }
}


// display the current grid template
const gridTemplate = document.getElementById("grid-template");
function displayGridTemplate(side){
    gridTemplate.innerHTML = `${side} X ${side}`
}

document.addEventListener('DOMContentLoaded', ()=>{
    addNewGrid(getComputedStyle(document.querySelector(":root")).getPropertyValue('--pixles'));
    displayGridTemplate(range.value);
    boardPixels = document.querySelectorAll('.board div');
}, false);

// change the clicked div's color
window.addEventListener('DOMContentLoaded', () =>{
    const boardPixels = document.querySelectorAll('.board div');
    boardPixels.forEach(pixel => pixel.addEventListener('mousedown', handleClicks))
    boardPixels.forEach(pixel => pixel.addEventListener('mouseup', handleClicks))
    boardPixels.forEach(pixel => pixel.addEventListener('mouseover', handleClicks))
})  
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
    else if (e.type === "mousedown")
        flag = true;
    if(flag)
        e.composedPath()[0].style.backgroundColor = color;
}

// handl the color input and save its value to color var
const colorInput = document.querySelector('input[type="color"]');
let color = colorInput.value;
colorInput.addEventListener('change', ()=>{
    color = colorInput.value;
    console.log(color);
})



let intervalId;
function handleFocusButton(btn){
    if(btn.value === "pen"){
        clearInterval(intervalId) // stop interval calls when focus in not rainbow
        color = colorInput.value;
    }
    else if(btn.value === "eraser"){
        clearInterval(intervalId)
        color = "#FFF";
    }
    else if(btn.value === "rainbow")
    intervalId  = setInterval(() =>{
        color = randomColor();
    },50);
}
function randomColor(){
    return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
}


const clearBtn = document.querySelector('.btn[value="clear"]');
clearBtn.addEventListener('click', () => addNewGrid(range.value));