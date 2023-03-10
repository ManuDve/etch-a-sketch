const divContainer = document.querySelector("#divcontainer");
const inputGrid = document.querySelector("#input-grid");
const inputColor = document.querySelector("#input-color")
const gridResult = document.querySelector("#grid-result")
const wrapperContainer = document.querySelector(".containerwrapper")
let root = document.documentElement;
let gridSize = 16;
let actualColor = inputColor.value;
let mouseDown = false;



function changeColor(elemento) {
    elemento.style.backgroundColor = actualColor;
}

function pickColor() {
    actualColor = inputColor.value;
    cursor.style.backgroundColor = actualColor;
}

function deleteGrid() {
        divContainer.replaceChildren();
}

function paintGrid(e) {
    e.addEventListener("mousedown", ()=> {
        actualColor = inputColor.value;
        changeColor(e);
    }, false)
    e.addEventListener("mouseenter", ()=> {
        if (mouseDown) {
            changeColor(e);
        }
        }, false)
}


function createGrid(size) {
    for (let i = 0; i<size*size; i++) {
        const div = document.createElement("div")
        divContainer.appendChild(div); 
        paintGrid(div);
    }
}

function changeGridSize() {
    gridSize = inputGrid.value;
    deleteGrid();
    root.style.setProperty("--gridsquare", gridSize);
    createGrid(gridSize); 
    gridResult.textContent = inputGrid.value + ` x ${inputGrid.value}`;
}



// Event Listeners

document.addEventListener("mousedown", ()=> {mouseDown = true;})
document.addEventListener("mouseup", ()=> {mouseDown = false;})
inputGrid.addEventListener("input", ()=>{changeGridSize();})


divContainer.addEventListener("touchmove", (event)=>{
    event.preventDefault();
    let x = event.touches[0].clientX;
    let y = event.touches[0].clientY;
    let selectedDiv = document.elementFromPoint(x, y);
    if (selectedDiv != null && selectedDiv.parentElement.id == "divcontainer") {
        changeColor(selectedDiv);
    }
}, false)
divContainer.addEventListener("touchstart", (event)=>{
    event.preventDefault();
    let x = event.touches[0].clientX;
    let y = event.touches[0].clientY;
    let selectedDiv = document.elementFromPoint(x, y);
    if (selectedDiv != null && selectedDiv.parentElement.id == "divcontainer") {
        changeColor(selectedDiv);
    }
}, false)

inputColor.addEventListener("input", ()=>{
    pickColor();
    previousColor = inputColor.value;
})


// Square Follow Mouse

let cursor = document.getElementById("cursor");
console.log(cursor)

document.addEventListener("mousemove", (e)=>{
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
})

wrapperContainer.addEventListener("mouseenter", ()=>{
    cursor.hidden = false;
}, false)

wrapperContainer.addEventListener("mouseleave", ()=>{
    cursor.hidden = true;
}, false)

// Pen and Eraser

const pen = document.getElementById("pen");
const eraser = document.getElementById("eraser");
penStatus = true;
eraserStatus = false;
let previousColor = "#ffffff";

pen.addEventListener("click", ()=>{
    penStatus = true;
    eraserStatus = false;
    pen.style.fill = "#03ffbc";
    eraser.style.fill = "white";
    inputColor.value = previousColor;
    pickColor();
})

eraser.addEventListener("click", ()=>{
    penStatus = false;
    eraserStatus = true;
    eraser.style.fill = "#03ffbc";
    pen.style.fill = "white";
    inputColor.value = "#202020";
    pickColor();
    
})


// Init Functions

createGrid(gridSize);
document.ondblclick = function(e) {e.preventDefault();}

