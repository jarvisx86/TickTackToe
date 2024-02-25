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
    for (let i = 1; i <= numberOfSquares; i++) {
        let playerData = document.getElementById(`t${i}`);
        playerData.innerHTML = "";
        playerData.dataset.player = "";
    }
}

function clickedSquare(elementId) {

    console.log()
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
}

function playSound(soundAsset) {
    let sound = document.getElementById(soundAsset);
    sound.currentTime = 0
    sound.play();
}

function stopSound(soundAsset) {
    let sound = document.getElementById(soundAsset);
    sound.pause();
    sound.currentTime = 0;
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

    /* 
    0 1 2
    3 4 5
    6 7 8
    */

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
    }

    if (document.getElementById("score-o").innerText < gamesWonByO) {
        document.getElementById("score-o").innerText = gamesWonByO;   
        addPointEffect("score-o");
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
    document.getElementById("win-modal").className = "center-items win-alert-modal hidden";
}