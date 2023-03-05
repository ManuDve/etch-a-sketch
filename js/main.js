const divContainer = document.querySelector("#divcontainer");
const inputGrid = document.querySelector("#input-grid");
const button = document.querySelector("#send-button");
const inputColor = document.querySelector("#input-color")
let root = document.documentElement;
let gridSize = 16;
let actualColor = inputColor.value;


function changeColor(elemento) {
    elemento.style.backgroundColor = actualColor;
}

function changeGridSize() {
    if (isNaN(inputGrid.value) || !inputGrid.value ) {
        alert("Enter a number!");
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

// Event Listeners

function createGrid(size) {
    for (let i = 0; i<size*size; i++) {
        const div = document.createElement("div")
        divContainer.appendChild(div);
        div.addEventListener("mouseenter", ()=> {
            changeColor(div);
        }, false)
        
    }
}

document.addEventListener("touchmove", (event)=>{
    let x = event.touches[0].clientX;
    let y = event.touches[0].clientY;
    event.preventDefault();
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

// Solucionar regla ID