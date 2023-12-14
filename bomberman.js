document.addEventListener("DOMContentLoaded", function DaGame() {
  createGameBoard();
  generatePlayer1();
  generateBomb(checkGameOver);
  moveLeft();
  moveRight();
  moveUp();
  moveDown();
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
  } else {
    console.error(`Element with class .grid-square.${playerXY} not found.`);
  }
};
//  M O V E M E N T
//   P A R T
const moveLeft = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      console.log("ArrowLeft key pressed!");

      // Check if moving left is within the game board boundaries
      if (playerCol > 1) {
        let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
        playerDiv.innerHTML = "";

        playerCol--; // Update the player's column position

        let leftXY = `${playerRow}${playerCol}`;
        let leftDiv = document.querySelector(`.grid-square.${leftXY}`);

        if (leftDiv) {
          const playerImage = document.createElement("img");
          playerImage.src = "./images/bomberman1.jpeg";
          playerImage.classList.add("player-image");
          leftDiv.appendChild(playerImage);
          playerXY = leftXY;
          checkGameOver();
        } else {
          console.log("We cannot move there");
        }
      } else {
        alert("Cannot move left, at the edge of the board.");
      }
    }
  });
};

const moveRight = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      console.log("ArrowRight key pressed!");

      // Check if moving right is within the game board boundaries
      if (playerCol < 7) {
        let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
        playerDiv.innerHTML = "";

        playerCol++;

        let RightXY = `${playerRow}${playerCol}`;
        let RightDiv = document.querySelector(`.grid-square.${RightXY}`);

        if (RightDiv) {
          const playerImage = document.createElement("img");
          playerImage.src = "./images/bomberman1.jpeg";
          playerImage.classList.add("player-image");
          RightDiv.appendChild(playerImage);
          playerXY = RightXY;
          checkGameOver();
        } else {
          console.log("We cannot move there");
        }
      } else {
        alert("Cannot move right, at the edge of the board.");
      }
    }
  });
};

const moveUp = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      console.log("ArrowUp key pressed!");

      // Check if moving up is within the game board boundaries
      if (playerRow !== rowLabels[0]) {
        let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
        playerDiv.innerHTML = "";
        let currentRowIndex = rowLabels.indexOf(playerRow);
        let newRowIndex = Math.max(currentRowIndex - 1, 0);
        playerRow = rowLabels[newRowIndex];
        let UpXY = `${playerRow}${playerCol}`;
        let UpDiv = document.querySelector(`.grid-square.${UpXY}`);

        if (UpDiv) {
          const playerImage = document.createElement("img");
          playerImage.src = "./images/bomberman1.jpeg";
          playerImage.classList.add("player-image");
          UpDiv.appendChild(playerImage);
          playerXY = UpXY;
          checkGameOver();
        } else {
          console.log("We cannot move there");
        }
      } else {
        alert("Cannot move UP, at the edge of the board.");
      }
    }
  });
};

const moveDown = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      console.log("ArrowDown key pressed!");

      // Check if moving up is within the game board boundaries
      if (playerRow !== rowLabels[6]) {
        let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
        playerDiv.innerHTML = "";
        let currentRowIndex = rowLabels.indexOf(playerRow);
        let newRowIndex = Math.min(currentRowIndex + 1, 6);
        playerRow = rowLabels[newRowIndex];
        let DownXY = `${playerRow}${playerCol}`;
        let DownDiv = document.querySelector(`.grid-square.${DownXY}`);

        if (DownDiv) {
          const playerImage = document.createElement("img");
          playerImage.src = "./images/bomberman1.jpeg";
          playerImage.classList.add("player-image");
          DownDiv.appendChild(playerImage);
          playerXY = DownXY;
          checkGameOver();
        } else {
          console.log("We cannot move there");
        }
      } else {
        alert("Cannot move UP, at the edge of the board.");
      }
    }
  });
};

// BOMB GENERATION
const generateBomb = (callback) => {
  let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
  let bombDiv = document.querySelector(`.grid-square.${bombXY}`);

  // Check if bomb is in the same position as the player
  while (bombDiv === playerDiv) {
    // Regenerate bomb coordinates
    bombRow = rowLabels[Math.floor(Math.random() * rowLabels.length)];
    bombCol = colLabels[Math.floor(Math.random() * colLabels.length)];
    bombXY = `${bombRow}${bombCol}`;
    bombDiv = document.querySelector(`.grid-square.${bombXY}`);
  }

  // Generate the bomb image
  const bombImage = document.createElement("img");
  bombImage.src = "./images/bomb.png";
  bombImage.classList.add("bomb-image");
  bombDiv.appendChild(bombImage);
  if (callback) {
    callback(bombXY);
  }
};

const gameWinPage = () => {
  gameContainer.innerHTML = " <img src='https://media1.giphy.com/media/t3sZxY5zS5B0z5zMIz/giphy.gif?cid=ecf05e475gutqqclngrqibz95la1wnszu4smiue2vdejvlse&ep=v1_gifs_search&rid=giphy.gif&ct=g ' alt='GIF Win Image'>";
};

const gameOverPage = () => {
  gameContainer.innerHTML = " <img src='https://media0.giphy.com/media/l3q2J7KgtglQ5GQH6/giphy.gif?cid=ecf05e47ulj9q0b2f9nfa1meuhiq0tq0v2algnrkcdjjfe6c&ep=v1_gifs_search&rid=giphy.gif&ct=g' alt='GIF Lose Image'>";
};

const checkGameOver = () => {
  if (playerXY === bombXY) {
    alert("Game Over!");
    gameOverPage();
  }
};
