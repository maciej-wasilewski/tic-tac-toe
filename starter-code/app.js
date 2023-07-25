const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const resetButton = document.querySelector('#reset');
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
    // Remove existing squares, if any
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    });
}

createBoard();

function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It is now " + go + "'s go.";
    e.target.removeEventListener('click', addGo);

    if (checkTie()) {
        infoDisplay.textContent = "It's a tie!";
        showResetButton();
        return;
    }

    if (checkScore()) {
        showResetButton();
        return;
    }
}

function checkTie() {
    const allSquares = document.querySelectorAll('.square');
    const isTie = Array.from(allSquares).every(square => square.firstChild !== null);
    return isTie;
}

function checkScore() {
    const allSquares = document.querySelectorAll('.square');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const array of winningCombos) {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!";
            showResetButton();
            return true;
        }

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!";
            showResetButton();
            return true;
        }
    }

    return false;
}

function showResetButton() {
    resetButton.style.display = 'block';
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => square.innerHTML = '');
    go = "circle";
    infoDisplay.textContent = "Circle goes first";
    resetButton.style.display = 'none';
    
    // Reattach event listeners to the squares after reset
    allSquares.forEach(square => square.addEventListener('click', addGo));
}

