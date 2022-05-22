const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const game = document.querySelector("#game");


const winConditions = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];


let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

}
function cellClicked(){

    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();

}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`

}
function checkWinner(){
    let roundWon = false;
    for(var i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellA == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
        game.classList.replace("shadow1","shadow2");

    }else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
        game.classList.replace("shadow1","shadow3");

    }else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    game.classList.replace("shadow2","shadow1");
    game.classList.replace("shadow3","shadow1");


}
