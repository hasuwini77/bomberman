let winCount = 0;
let lossCount = 0;
let hasGameWon = false;

document.addEventListener("DOMContentLoaded", function DaGame() {
  createGameBoard();
  generatePlayer1();
  generateBomb(checkGameOver, checkGameWin);
  setupMovementListeners();
});

const gameMainContent = document.querySelector(".main-content");
const gameWrapperDiv = document.querySelector(".game-wrapper");
let gameContainer = document.querySelector(".game-container");
const restartButton = document.getElementById("restartButton");
const rowLabels = ["A", "B", "C", "D", "E", "F", "G"];
const colLabels = ["1", "2", "3", "4", "5", "6", "7"];
let playerRow = rowLabels[Math.floor(Math.random() * rowLabels.length)];
let playerCol = colLabels[Math.floor(Math.random() * colLabels.length)];
let playerXY = `${playerRow}${playerCol}`;
let bombRow = rowLabels[Math.floor(Math.random() * rowLabels.length)];
let bombCol = colLabels[Math.floor(Math.random() * colLabels.length)];
let bombXY = `${bombRow}${bombCol}`;
let moveCount = 0;

function createGameBoard() {
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
      gridSquare.classList.add(`${rowLabels[row]}${colLabels[col]}`);
      gameContainer.appendChild(gridSquare);
    }
  }
}

const generatePlayer1 = () => {
  let playerDiv = document.querySelector(`.grid-square.${playerXY}`);

  if (playerDiv) {
    const playerImage = document.createElement("img");
    playerImage.src = "./images/bomberman1.jpeg";
    playerImage.classList.add("player-image");
    playerDiv.appendChild(playerImage);
    markVisitedSquare(playerRow, playerCol);
  } else {
    console.error(`Element with class .grid-square.${playerXY} not found.`);
  }
};

const setupMovementListeners = () => {
  document.addEventListener("keydown", handleKeyDown);

  const upButton = document.querySelector("#upButton");
  const downButton = document.querySelector("#downButton");
  const leftButton = document.querySelector("#leftButton");
  const rightButton = document.querySelector("#rightButton");

  upButton.addEventListener("click", moveUp);
  downButton.addEventListener("click", moveDown);
  leftButton.addEventListener("click", moveLeft);
  rightButton.addEventListener("click", moveRight);
};

const handleKeyDown = (event) => {
  if (hasGameWon) {
    return;
  }
  switch (event.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
  }
};

const moveLeft = () => {
  if (playerCol > 1) {
    let leftXY = `${playerRow}${parseInt(playerCol) - 1}`;
    handleMove(leftXY);
  } else {
    alert("Cannot move left, at the edge of the board.");
  }
};

const moveRight = () => {
  if (playerCol < 7) {
    let rightXY = `${playerRow}${parseInt(playerCol) + 1}`;
    handleMove(rightXY);
  } else {
    alert("Cannot move right, at the edge of the board.");
  }
};

const moveUp = () => {
  if (rowLabels.indexOf(playerRow) !== 0) {
    let upRow = rowLabels[rowLabels.indexOf(playerRow) - 1];
    let upXY = `${upRow}${playerCol}`;
    handleMove(upXY);
  } else {
    alert("Cannot move UP, at the edge of the board.");
  }
};

const moveDown = () => {
  if (rowLabels.indexOf(playerRow) !== 6) {
    let downRow = rowLabels[rowLabels.indexOf(playerRow) + 1];
    let downXY = `${downRow}${playerCol}`;
    handleMove(downXY);
  } else {
    alert("Cannot move DOWN, at the edge of the board.");
  }
};

const handleMove = (newXY) => {
  if (hasGameWon) {
    return;
  }
  if (!hasVisited(newXY)) {
    let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
    if (!playerDiv) {
      console.log(`No need to press the arrows here ;) 
      \n Press the Restart Game button instead ;)`);
      return;
    }
    playerDiv.innerHTML = "";

    let newDiv = document.querySelector(`.grid-square.${newXY}`);
    if (!newDiv) {
      console.log(`No need to press the arrows here ;) 
      \n Press the Restart Game button instead ;)`);
      return;
    }
    moveCount++;
    document.querySelector("h2").textContent = ` Counter: ${moveCount} moves`;

    if (newDiv) {
      const playerImage = document.createElement("img");
      playerImage.src = "./images/bomberman1.jpeg";
      playerImage.classList.add("player-image");
      newDiv.appendChild(playerImage);
      playerRow = newXY.charAt(0);
      playerCol = newXY.charAt(1);
      playerXY = newXY;
      markVisitedSquare(playerRow, playerCol);
      checkGameOver();
      checkGameWin();
      instructionsRemover();
      instructionsButtonRemover();
      displayWinLossCount();
    } else {
      console.log("We cannot move there");
    }
  } else {
    alert("Already visited this square");
  }
};
const mobileMovement = () => {
  const upButton = document.querySelector("#upButton");
  const downButton = document.querySelector("#downButton");
  const leftButton = document.querySelector("#leftButton");
  const rightButton = document.querySelector("#rightButton");

  upButton.addEventListener("click", moveUp);
  downButton.addEventListener("click", moveDown);
  leftButton.addEventListener("click", moveLeft);
  rightButton.addEventListener("click", moveRight);
};

const generateBomb = (callback) => {
  const bombImage = document.createElement("img");
  bombImage.src = "./images/bomb.png";
  bombImage.classList.add("bomb-image");
  bombImage.classList.add("invisible");

  while (bombXY === playerXY) {
    bombRow = rowLabels[Math.floor(Math.random() * rowLabels.length)];
    bombCol = colLabels[Math.floor(Math.random() * colLabels.length)];
    bombXY = `${bombRow}${bombCol}`;
    bombDiv = document.querySelector(`.grid-square.${bombXY}`);
  }

  let bombDiv = document.querySelector(`.grid-square.${bombXY}`);

  if (bombDiv) {
    bombDiv.appendChild(bombImage);
  } else {
    console.error(`Element with class .grid-square.${bombXY} not found.`);
  }

  if (callback) {
    callback(bombXY);
  }
};

const initGame = () => {
  moveCount = 0;

  // Check if gameContainer exists
  if (gameContainer) {
    gameContainer.remove();
  }
  document.querySelectorAll(".game-image-win, .game-image-lose, .restart-button").forEach((element) => element.remove());

  // Create a new gameContainer
  gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");

  gameWrapperDiv.appendChild(gameContainer);

  // Reset player and bomb positions
  playerRow = rowLabels[Math.floor(Math.random() * rowLabels.length)];
  playerCol = colLabels[Math.floor(Math.random() * colLabels.length)];
  playerXY = `${playerRow}${playerCol}`;
  bombRow = rowLabels[Math.floor(Math.random() * rowLabels.length)];
  bombCol = colLabels[Math.floor(Math.random() * colLabels.length)];
  bombXY = `${bombRow}${bombCol}`;

  createGameBoard();
  generatePlayer1();
  generateBomb(checkGameOver, checkGameWin);
  setupMovementListeners();
  document.querySelector("h2").textContent = ` Counter: ${moveCount} moves`;

  hideHelpBubble();
  if (winCount > 0 || lossCount > 0) {
    displayWinLossCount();
  }
};

document.addEventListener("click", function (event) {
  if (event.target.id === "restartButton") {
    initGame();
  }
});

const gameWinPage = () => {
  winCount++;
  displayWinLossCount();
  gameWrapperDiv.innerHTML = `<p class="winCount">Wins: ${winCount}</p> <p class="lossCount">Losses: ${lossCount}</p><img class='game-image-win' src='https://media1.giphy.com/media/t3sZxY5zS5B0z5zMIz/giphy.gif?cid=ecf05e475gutqqclngrqibz95la1wnszu4smiue2vdejvlse&ep=v1_gifs_search&rid=giphy.gif&ct=g' alt='GIF Win Image'>
  <button class="restart-button" id="restartButton">Restart Game</button>`;
  if (restartButton) restartButton.addEventListener("click", initGame);
  if (restartButton) restartButton.style.display = "block";
  displayWinLossCount();
};

const gameOverPage = () => {
  lossCount++;
  displayWinLossCount();
  gameWrapperDiv.innerHTML = `<p class="winCount">Wins: ${winCount}</p> <p class="lossCount">Losses: ${lossCount}</p> <img class='game-image-lose' src='https://media0.giphy.com/media/l3q2J7KgtglQ5GQH6/giphy.gif?cid=ecf05e47ulj9q0b2f9nfa1meuhiq0tq0v2algnrkcdjjfe6c&ep=v1_gifs_search&rid=giphy.gif&ct=g' alt='GIF Lose Image'>
  <button class="restart-button" id="restartButton">Restart Game</button>`;
  if (restartButton) restartButton.addEventListener("click", initGame);
  if (restartButton) restartButton.style.display = "block";
  displayWinLossCount();
};

const checkGameOver = () => {
  const noMovePossible = !canMove("up") && !canMove("down") && !canMove("left") && !canMove("right");

  if (playerXY === bombXY) {
    let daBomb = document.querySelector(".bomb-image");
    daBomb.classList.add("blinking");
    setTimeout(() => {
      alert("Game Over!");
      gameOverPage();
    }, 80);
  } else if (noMovePossible) {
    setTimeout(() => {
      alert("You locked yourself down bro!");
      gameOverPage();
    }, 80);
  }
};

// Find out if newXY is within boundaries
const canMove = (direction) => {
  if (hasGameWon) {
    return;
  }
  const newRow = rowLabels.indexOf(playerRow) + (direction === "up" ? -1 : direction === "down" ? 1 : 0);
  const newCol = parseInt(playerCol) + (direction === "left" ? -1 : direction === "right" ? 1 : 0);
  const newXY = `${rowLabels[newRow]}${newCol}`;

  return newRow >= 0 && newRow < 7 && newCol >= 1 && newCol <= 7 && !hasVisited(newXY);
};

const checkGameWin = () => {
  if (moveCount >= 15 && !hasGameWon) {
    hasGameWon = true;

    let newWinnerImage = document.querySelector(".player-image");
    newWinnerImage.classList.add("blinking");

    const winMessage = document.createElement("div");
    winMessage.classList.add("win-message");
    winMessage.textContent = "Congratulations! You WIN!";

    gameContainer.appendChild(winMessage);

    setTimeout(() => {
      winMessage.remove();
      gameWinPage();
      hasGameWon = false;
    }, 5000);
  }
};

// COUNTERS

let winCounter = document.getElementById("winCount");
let lossCounter = document.getElementById("lossCount");

const displayWinLossCount = () => {
  if (winCounter !== null && lossCounter !== null) {
    winCounter.textContent = `Wins: ${winCount}`;
    lossCounter.textContent = `Losses: ${lossCount}`;
  }
};

const instructionsRemover = () => {
  if (moveCount > 0) {
    let bubble = document.querySelector("div.help-bubble");
    if (bubble) {
      bubble.style.opacity = 0;
      bubble.addEventListener(
        "transitionend",
        () => {
          bubble.remove();
        },
        { once: true }
      );
    }
  }
};

const instructionsButtonRemover = () => {
  if (moveCount > 0) {
    let instruButton = document.querySelector("div.help-button");
    instruButton.textContent = "";
  }
};

const markVisitedSquare = (row, col) => {
  if (rowLabels.includes(row) && colLabels.includes(col)) {
    const visitedSquare = document.querySelector(`.grid-square.${row}${col}`);

    if (visitedSquare) {
      visitedSquare.classList.add("visited");
    } else {
      console.error(`Element with class .grid-square.${row}${col} not found.`);
    }
  }
};

const hasVisited = (xy) => {
  const visitedSquare = document.querySelector(`.grid-square.${xy}`);
  return visitedSquare && visitedSquare.classList.contains("visited");
};

const showHelpBubble = () => {
  let bubbleHelp = document.getElementById("helpBubble");
  if (bubbleHelp) {
    bubbleHelp.classList.add("show");
  }
};

const hideHelpBubble = () => {
  let bubbleHelp = document.getElementById("helpBubble");
  if (bubbleHelp) {
    bubbleHelp.classList.remove("show");
  }
};
