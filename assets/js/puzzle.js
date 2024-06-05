

var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;


var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
//var imgInitial = ["1", "3", "2", "4", "5", "6", "7", "8", "9"];
var imgInitial = ["4", "2", "3","8", "5", "1", "6", "7", "9",];

var lastImage = document.querySelector(".lastImage");

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "assets/images/" + imgInitial.shift() + ".jpeg";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); 
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart() {
    currTile = this; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this; 
}

function dragEnd() {
    swapTiles();
}

function touchStart(e) {
    e.preventDefault();
    currTile = e.target;
}

function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    otherTile = document.elementFromPoint(touch.clientX, touch.clientY);
}

function touchEnd(e) {
    e.preventDefault();
    swapTiles();
}

function swapTiles() {
    if (!otherTile || currTile === otherTile || !otherTile.src.includes(".jpeg")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        setTimeout(() => {
            if (checkCompletion()) {
                window.alert("Finalizado");
            }
        }, 100);
    }
}

function checkCompletion() {
    let tiles = document.querySelectorAll("#board img");
    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].src.includes(imgOrder[i] + ".jpeg")) {
            return false;
        }
    }
    return true;
}

