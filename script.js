let userScore = 0;
let compScore = 0;
let roundCount = 0;

const UScore = document.querySelector("#user");
const CScore = document.querySelector("#computer");

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#msg");
const body = document.body;

const genCompChoice = () => {
  const options = [
    "Dev",
    "Manav",
    "Asur",
    "Asur",
    "Dev",
    "Manav",
    "Dev",
    "Asur",
    "Manav",
  ];
  const randIdx = Math.floor(Math.random() * 9);
  return options[randIdx];
};
const drawGame = () => {
  console.log("Game Was Draw!");
  msg.innerText = "Game Was Draw!";
  msg.style.backgroundColor = "rgb(209 162 253)";
  msg.style.color = "black";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin === true) {
    userScore++;
    UScore.innerText = userScore;
    console.log("YOU WIN");
    msg.innerText = `Congratulations You Win ${userChoice} beats ${compChoice}  `;
    msg.style.backgroundColor = "#9ae29a";
    msg.style.color = "black";
  } else {
    compScore++;
    CScore.innerText = compScore;
    console.log("YOU LOSE");
    msg.innerText = `Better Luck Next Time ${compChoice} beats ${userChoice}  `;
    msg.style.backgroundColor = "#ef8b73";
    msg.style.color = "black";
  }
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  roundCount = 0;
  UScore.innerText = userScore;
  CScore.innerText = compScore;
  msg.innerText = "Game Reset! Start Again.";
  msg.style.backgroundColor = "white";
  msg.style.color = "black";
};

const playGame = (userChoice) => {
  console.log("user choice= ", userChoice);

  //generate computer choice
  const compChoice = genCompChoice();
  console.log("computer choice= ", compChoice);

  let userWin = true;
  if (userChoice === compChoice) {
    drawGame();
    roundCount++;
    return;
  } else {
    if (userChoice === "Dev") {
      // Dev wins against Asur and Manav
      userWin = compChoice === "Asur" || compChoice === "Manav" ? true : false;
    } else if (userChoice === "Manav") {
      // Manav wins against Asur but loses to Dev
      userWin =
        compChoice === "Asur" ? true : compChoice === "Dev" ? false : false;
    } else if (userChoice === "Asur") {
      // Asur loses to both Dev and Manav
      userWin = false;
    }
    roundCount++;
    showWinner(userWin, userChoice, compChoice);
  }

  // Update round count and check if it's time to reset the game

  if (roundCount >= 6) {
    let finalMessage = "Game Over! ";
    if (userScore > compScore) {
      finalMessage += "You are the overall winner! please wait to start again";
    } else if (compScore > userScore) {
      finalMessage +=
        "Computer is the overall winner! please wait to start again";
    } else {
      finalMessage += "It's a draw! please wait to start again";
    }
    msg.innerText = finalMessage;

    setTimeout(resetGame, 3000); // Wait for 2 seconds before resetting the game
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
