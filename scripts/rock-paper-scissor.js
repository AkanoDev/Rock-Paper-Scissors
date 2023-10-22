const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();
/*if (!score) {
    score = {
    wins: 0,
    losses: 0,
    ties: 0,
      };
    }*/

let isAutoPlaying = false;
let intervalId;
//const autoPlay = () => {
//};
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissor") {
    if (computerMove === "rock") {
      result = "You Lose!";
    } else if (computerMove === "paper") {
      result = "You Win!";
    } else if (computerMove === "scissor") {
      result = "Draw";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win!";
    } else if (computerMove === "paper") {
      result = "Draw";
    } else if (computerMove === "scissor") {
      result = "You Lose!";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Draw";
    } else if (computerMove === "paper") {
      result = "You Lose!";
    } else if (computerMove === "scissor") {
      result = "You Win!";
    }
  }

  if (result === "You Win!") {
    score.wins += 1;
  } else if (result === "You Lose!") {
    score.losses += 1;
  } else if (result === "Draw") {
    score.ties = score.ties + 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScore();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `
    <img src="images/${playerMove}.png" /> VS
    <img src="images/${computerMove}.png" />`;
}

function updateScore() {
  document.querySelector(
    ".js-score-box"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissor";
  }

  return computerMove; // returning variable is preffered instead of using global variable
}
