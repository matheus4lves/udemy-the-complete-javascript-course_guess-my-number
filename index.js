"use strict";
// DOM manipulation
const highscoreSpan = document.querySelector(".highscore");
const messageParagraph = document.querySelector(".message");
const scoreSpan = document.querySelector(".score");
const numberDiv = document.querySelector(".number");
const guessInput = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");
// Functionality definition
let randomInteger;
let guessedInteger;
let score = 20;
let highscore = 0;
let isGameOver = false;
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function handleWrongGuess(message) {
    score--;
    messageParagraph.textContent = message;
    scoreSpan.textContent = score.toString();
}
/* Not moving shared code between handleCorrectGuess and playGameAgain to its own function.
Reason: the number of parameters would be high. */
function handleCorrectGuess() {
    // Changing text and dimensions cause reflow. Here, I'm batching changes.
    requestAnimationFrame(() => {
        if (score > highscore) {
            highscore = score;
            highscoreSpan.textContent = highscore.toString();
        }
        messageParagraph.textContent = "🎉 Correct number!";
        numberDiv.style.width = "30rem";
        numberDiv.textContent = guessInput.value;
    });
    document.body.style.backgroundColor = "#60b347";
    isGameOver = true;
}
function initializeGame() {
    randomInteger = generateRandomInteger(1, 20);
}
function reinitializeGame() {
    randomInteger = generateRandomInteger(1, 20);
    isGameOver = false;
    score = 20;
    requestAnimationFrame(() => {
        messageParagraph.textContent = "Start guessing...";
        scoreSpan.textContent = "20";
        numberDiv.style.width = "15rem";
        numberDiv.textContent = "?";
    });
    document.body.style.backgroundColor = "#222";
    guessInput.value = "";
}
function playGame() {
    if (isGameOver)
        return;
    guessedInteger = +guessInput.value;
    // Validate input
    if (Number.isNaN(guessedInteger) ||
        !Number.isInteger(guessedInteger) ||
        guessedInteger < 1 ||
        guessedInteger > 20) {
        return;
    }
    if (guessedInteger < randomInteger) {
        handleWrongGuess("📉 Too low!");
    }
    else if (guessedInteger > randomInteger) {
        handleWrongGuess("📈 Too high!");
    }
    else {
        handleCorrectGuess();
    }
    // If the player loses all attempts
    if (!score) {
        isGameOver = true;
        messageParagraph.textContent = "💥 You lost the game!";
    }
}
// Event handling
document.addEventListener("DOMContentLoaded", initializeGame);
// For playing using the button
checkBtn.addEventListener("click", playGame);
// For playing hitting "Enter"
guessInput.addEventListener("keydown", event => {
    if (event.key === "Enter")
        playGame();
});
againBtn.addEventListener("click", reinitializeGame);
