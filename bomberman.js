document.addEventListener("DOMContentLoaded", function DaGame() {
  createGameBoard();
  generatePlayer1();
  generateBomb(checkGameOver, checkGameWin);
  musicPlay();
  setupMovementListeners();
});

const gameContainer = document.querySelector(".game-container");
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

// M O V E M E N T
// F U N C T I O N S

const setupMovementListeners = () => {
  document.addEventListener("keydown", (event) => {
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
  });

  const upButton = document.querySelector("#upButton");
  const downButton = document.querySelector("#downButton");
  const leftButton = document.querySelector("#leftButton");
  const rightButton = document.querySelector("#rightButton");

  upButton.addEventListener("click", moveUp);
  downButton.addEventListener("click", moveDown);
  leftButton.addEventListener("click", moveLeft);
  rightButton.addEventListener("click", moveRight);
};

const moveLeft = () => {
  if (playerCol > 1) {
    let leftXY = `${playerRow}${playerCol - 1}`;
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
  if (!hasVisited(newXY)) {
    let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
    playerDiv.innerHTML = "";

    let newDiv = document.querySelector(`.grid-square.${newXY}`);
    moveCount++;
    let moveCounter = (document.querySelector("h2").textContent = ` Counter: ${moveCount} moves`);

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
    } else {
      console.log("We cannot move there");
    }
  } else {
    alert("Already visited this square");
  }
};

// MOBILE MOVEMENT

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

// BOMB GENERATION
const generateBomb = (callback) => {
  // Generate the bomb image
  const bombImage = document.createElement("img");
  bombImage.src = "./images/bomb.png";
  bombImage.classList.add("bomb-image");
  bombImage.classList.add("invisible");

  // Check if bomb is in the same position as the player
  while (bombXY === playerXY) {
    // Regenerate bomb coordinates
    bombRow = rowLabels[Math.floor(Math.random() * rowLabels.length)];
    bombCol = colLabels[Math.floor(Math.random() * colLabels.length)];
    bombXY = `${bombRow}${bombCol}`;
    bombDiv = document.querySelector(`.grid-square.${bombXY}`);
  }
  // select the bomb square
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

// Win and lose conditions
const gameWinPage = () => {
  gameContainer.innerHTML = "<img class='game-image-win' src='https://media1.giphy.com/media/t3sZxY5zS5B0z5zMIz/giphy.gif?cid=ecf05e475gutqqclngrqibz95la1wnszu4smiue2vdejvlse&ep=v1_gifs_search&rid=giphy.gif&ct=g' alt='GIF Win Image'>";
};

const gameOverPage = () => {
  gameContainer.innerHTML = "<img class='game-image-lose' src='https://media0.giphy.com/media/l3q2J7KgtglQ5GQH6/giphy.gif?cid=ecf05e47ulj9q0b2f9nfa1meuhiq0tq0v2algnrkcdjjfe6c&ep=v1_gifs_search&rid=giphy.gif&ct=g' alt='GIF Lose Image'>";
};

const checkGameOver = () => {
  if (playerXY === bombXY) {
    let daBomb = document.querySelector(".bomb-image");
    daBomb.classList.add("blinking");
    // Introduce a delay before displaying the Game Over Alert
    setTimeout(() => {
      alert("Game Over!");
      gameOverPage();
    }, 80);
  }
};

const checkGameWin = () => {
  if (moveCount >= 15) {
    let newWinnerImage = document.querySelector(".player-image");
    newWinnerImage.classList.add("blinking");
    // Same delay here
    setTimeout(() => {
      alert("Congrats, you WIN!!");
      gameWinPage();
    }, 80);
  }
};

const instructionsRemover = () => {
  if (moveCount > 0) {
    let paragraphs = document.querySelectorAll(".instructions-para");
    paragraphs.forEach((para) => {
      para.textContent = "";
    });
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

/* EVENTUALLY USEFUL:

 const checkCollisionWithBomb = () => {
  let bombSquare = document.querySelector(`.grid-square.${bombXY}`);
  if (bombSquare && !bombSquare.querySelector(".invisible")) {
    alert("Game Over!");
    gameOverPage();
  }
};  */

const toggleMusic = () => {
  let audio = document.getElementById("backgroundMusic");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

const musicPlay = () => {
  let audio = document.getElementById("backgroundMusic");
  audio.loop = true;

  let myMusic = document.querySelector(".toggle-music");
  myMusic.addEventListener("click", toggleMusic);
};
