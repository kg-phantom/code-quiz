var timeLeft = 10;
var timerEl = document.querySelector("#timer");
timerEl.textContent = "Time: " + timeLeft;
var divEl = document.querySelector("div.content");
var introEl = document.querySelector("#intro");
var startButton = document.querySelector("#start-btn");
var h1El = document.querySelector("h1");
var questions = [
    // question 1
    { q: "Commonly used data types do NOT include:", a: "3. alerts"},
    // question 2
    { q: "The condition in an if/else statement is enclosed with:", a: "3. parentheses"},
    // question 3
    { q: "Arrays in JavaScript can be used to store ______.", a: ""},
    //question 4
    { q: "String values must be enclosed with ______ when being assigned to variables.", a: ""},
    // question 5
    { q: "A very useful tool during development and debugging for printing content to the debugger is:", a: ""},
];

var questionNumber = 0;
var choiceButton = [];
var choices = ["1. strings", "2. booleans", "3. alerts", "4. numbers", "1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"];

var answerButton = document.createElement("button");
answerButton.id = "answer";

function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if(timeLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function displayQuestion() {
    // display question in h1El
    h1El.textContent = questions[questionNumber].q;
    

    // for(var i = 4; i < 8; i++) {

    // }

}

startButton.addEventListener("click", function() {
    // remove startButton and opening instructions
    startButton.remove();
    introEl.remove();
    
    // start timer
        startTimer();

    // add .question class to h1
    h1El.className = "question";
    
    // create buttons for answer choices
    for(var i = 0; i < 4; i++) {
        if(i != 2) {
            choiceButton[i] = document.createElement("button");
            choiceButton[i].textContent = choices[i];
            choiceButton[i].className = "choiceButton";
            divEl.appendChild(choiceButton[i]);
        }
        else {
            answerButton.textContent = choices[i];
            answerButton.className = "choiceButton";
            divEl.appendChild(answerButton);
        }
    }

    // display question 1
    displayQuestion();
});

function correct() {
    questionNumber++;

    displayQuestion();
}

function gameOver() {
    h1El.textContent = "All done!";

}

answerButton.addEventListener("click", correct);