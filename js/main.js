const divContainer = document.querySelector("#divcontainer");
const inputGrid = document.querySelector("#input-grid");
const button = document.querySelector("#send-button");
const inputColor = document.querySelector("#input-color")
let root = document.documentElement;
let gridSize = 16;
let actualColor = inputColor.value;
// Implementar herramienta de borrar
let previousColor;
let mouseDown = false;



function changeColor(elemento) {
    elemento.style.backgroundColor = actualColor;
}

function changeGridSize() {
    if (isNaN(inputGrid.value) || !inputGrid.value ||  inputGrid.value>128 || inputGrid.value<1) {
        alert("Enter a number between 1 and 100!");
    } else {
        deleteGrid();
        gridSize = inputGrid.value;
        root.style.setProperty("--gridsquare", gridSize);
        updateGridPlaceholder();
        createGrid(gridSize);
    }
    
}

function pickColor() {
    actualColor = inputColor.value;
}

function deleteGrid() {
        divContainer.replaceChildren();
}

function updateGridPlaceholder() {
    inputGrid.placeholder = "Grid Size: " + gridSize;
    inputGrid.value = "";
}


function paintGrid(e) {
    e.addEventListener("mousedown", ()=> {
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

// Event Listeners


document.addEventListener("mousedown", ()=> {mouseDown = true;})
document.addEventListener("mouseup", ()=> {mouseDown = false;})

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

button.addEventListener("click", changeGridSize)
inputColor.addEventListener("change", pickColor)


// Init Functions

createGrid(gridSize);
updateGridPlaceholder();
document.ondblclick = function(e) {e.preventDefault();}

/* divContainer.childNodes.forEach(element => {
    element.addEventListener("touchmove", function evento(event) {
    event.preventDefault();
    let x = event.touches[0].clientX;
    let y = event.touches[0].clientY;
    let selectedDiv = document.elementFromPoint(x, y);
    if (selectedDiv.tagName != "DIV") {
        element.removeEventListener("touchmove", (evento));
    }
    else if (selectedDiv.parentElement.id == "divcontainer") {
        changeColor(selectedDiv);
    }
    })
}); */
