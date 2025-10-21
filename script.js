// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly
let score = 0;
let timer = 30;
let timerInterval;

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  // Reset score at game start
  score = 0;
  updateScore();

  // Reset and display timer
  timer = 30;
  updateTimer();

  // Start countdown timer
  timerInterval = setInterval(() => {
    timer -= 1;
    updateTimer();
    if (timer <= 0) {
      endGame();
    }
  }, 1000);

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
}

// Add this function to update score display
function updateScore() {
  const scoreElem = document.getElementById("score");
  if (scoreElem) scoreElem.textContent = score;
}

// Add this function to update timer display
function updateTimer() {
  const timerElem = document.querySelector(".timer");
  if (timerElem) timerElem.textContent = timer;
}

// End the game when timer reaches 0
function endGame() {
  clearInterval(dropMaker);
  clearInterval(timerInterval);
  gameRunning = false;
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Assign one of two random solid colors
  const dropColors = ["#2E9DF7", "#FFC907"];
  const color = dropColors[Math.floor(Math.random() * dropColors.length)];
  drop.style.backgroundColor = color;

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Score logic for clicking drops
  drop.addEventListener("click", () => {
    if (color === "#2E9DF7") {
      score += 1;
    } else if (color === "#FFC907") {
      score -= 1;
    }
    updateScore();
    drop.remove();
  });

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}
