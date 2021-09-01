var time = 75;
var timerEl = document.querySelector("#timer");
timerEl.textContent = "Time: " + time;
var divEl = document.querySelector("div.content");
var introEl = document.querySelector("#intro");
var startButton = document.querySelector("#start-btn");
var h1El = document.querySelector("h1");
var questions = [
    // question 1
    "Commonly used data types do NOT include:",
    // question 2
    "The condition in an if/else statement is enclosed with:",
    // question 3
    "Arrays in JavaScript can be used to store ______.",
    //question 4
    "String values must be enclosed with ______ when being assigned to variables.",
    // question 5
    "A very useful tool during development and debugging for printing content to the debugger is:"
];
var questionNumber = 0;
var choiceButton = [];
var choice = ["1. strings", "2. booleans", "3. alerts", "4. numbers"];

function startTimer() {
    setInterval(function() {
        time--;
        timerEl.textContent = "Time: " + time;
    }, 1000);
}

function displayQuestion() {
    // display question in h1El
    h1El.textContent = questions[questionNumber];

    // display answer choices

}

startButton.addEventListener("click", function() {
    // start timer
    startTimer();

    // remove startButton and opening instructions
    startButton.remove();
    introEl.remove();

    // add .question class to h1
    h1El.className = "question";

    // create buttons for answer choices
    for(var i = 0; i < 4; i++) {
        choiceButton[i] = document.createElement("button");
        choiceButton[i].textContent = choice[i];
        choiceButton[i].className = "choiceButton";
        divEl.appendChild(choiceButton[i]);
    }

    // display question 1
    displayQuestion();
})