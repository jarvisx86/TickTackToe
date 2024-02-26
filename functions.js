const numberOfSquares = 9;
var gamesWonByO = 0;
var gamesWonByX = 0;

var oTurn = false;
var xTurn = true;

const xWinCondition = "XXX";
const oWinCondition = "OOO";

const empireImg = '<img class="board-image" src="img/stormtrooper.png" alt="stormtrooper"/>';
const rebelsImg = '<img class="board-image" src="img/rebels.png" alt="rebels"/>';

function clearGameBoard() {
    let clearSound = document.getElementById('clear-sound');
    clearSound.currentTime = 0.3;
    clearSound.play();
    
    for (let i = 1; i <= numberOfSquares; i++) {
        let playerData = document.getElementById(`t${i}`);
        playerData.innerHTML = "";
        playerData.dataset.player = "";
    }
}

function clickedSquare(elementId) {
    if (elementId === null) return;

    const gameBoardValue = document.getElementById(elementId);

    let newGameBoardValue = "";
    let newGameBoardImg = "";

    if (gameBoardValue.dataset.player.length > 0) {
        return;
    }

    if (xTurn === true) {
        gameBoardValue.dataset.player = "X"
        newGameBoardImg = empireImg;
        xTurn = false;
        oTurn = true;
    }
    else {
        gameBoardValue.dataset.player = "O";
        newGameBoardImg = rebelsImg;
        xTurn = true;
        oTurn = false;
    }

    document.getElementById(elementId).innerHTML = newGameBoardImg;
    checkForWinCondition();
    
    let selectSquareSound = document.getElementById("close-modal");
    selectSquareSound.currentTime = 0;
    selectSquareSound.play();
}

function checkForWinCondition() {
    // get game board state
    const gameBoardValues = [];

    for (let i = 1; i <= numberOfSquares; i++) {
        let playerData = document.getElementById(`t${i}`);
        let value = "";

        if (playerData.dataset.player != null) {
            value = playerData.dataset.player;
        }
        
        gameBoardValues[i - 1] = value;
    }

    // check for three in a row
    const winValues = [];
    winValues[0] = `${gameBoardValues[0]}${gameBoardValues[1]}${gameBoardValues[2]}`;
    winValues[1] = `${gameBoardValues[0]}${gameBoardValues[3]}${gameBoardValues[6]}`;
    winValues[2] = `${gameBoardValues[0]}${gameBoardValues[4]}${gameBoardValues[8]}`;
    winValues[3] = `${gameBoardValues[2]}${gameBoardValues[5]}${gameBoardValues[8]}`;
    winValues[4] = `${gameBoardValues[2]}${gameBoardValues[4]}${gameBoardValues[6]}`;
    winValues[5] = `${gameBoardValues[6]}${gameBoardValues[7]}${gameBoardValues[8]}`;
    winValues[6] = `${gameBoardValues[3]}${gameBoardValues[4]}${gameBoardValues[5]}`;
    winValues[7] = `${gameBoardValues[1]}${gameBoardValues[4]}${gameBoardValues[7]}`;

    var wonMessage = "";
    for (let i = 0; i < winValues.length; i++) {
        if (winValues[i] === xWinCondition) {
            gamesWonByX += 1;
            wonMessage = "Long live the\nEmpire!"
            break;
        }

        if (winValues[i] === oWinCondition) {
            gamesWonByO += 1;
            wonMessage = "The force will be\nwith you, always!"
            break;
        }
    }

    if (wonMessage.length > 0) {
        // allow screen to update before sending won message
        setTimeout( function() {
            displayModal(wonMessage);
            clearGameBoard();
        }, 300);

        updatePlayerScores();
    }
}

function updatePlayerScores() {
    if (document.getElementById("score-x").innerText < gamesWonByX) {
        document.getElementById("score-x").innerText = gamesWonByX;
        addPointEffect("score-x");
        let empireWinSound = document.getElementById("empire-win-sound");
        empireWinSound.play();
    }

    if (document.getElementById("score-o").innerText < gamesWonByO) {
        document.getElementById("score-o").innerText = gamesWonByO;   
        addPointEffect("score-o");
        let rebelWinSound = document.getElementById("rebel-win-sound");
        rebelWinSound.play();
    }
}

function addPointEffect(playerId) {
    document.getElementById(playerId).className = "animation flash";
    setTimeout(function() {
        document.getElementById(playerId).className = "";
    }, 2000)
}

function displayModal(wonMessage) {
    let winModal = document.getElementById("win-modal");
    winModal.className = "center-items win-alert-modal display";

    document.getElementById("win-text").innerText = wonMessage;
}

function closeModal() {
    let closeModalSound = document.getElementById("close-modal");
    closeModalSound.currentTime = 0;
    closeModalSound.play();

    document.getElementById("win-modal").className = "center-items win-alert-modal hidden";
}