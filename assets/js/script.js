var timeLeft = 75;
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
    { q: "Arrays in JavaScript can be used to store ______.", a: "4. all of the above"},
    //question 4
    { q: "String values must be enclosed with ______ when being assigned to variables.", a: "3. quotes"},
    // question 5
    { q: "A very useful tool during development and debugging for printing content to the debugger is:", a: "4. console.log"},
];

var questionNumber = 0;
var choiceButton = [];
var choices = [
    ["1. strings", "2. booleans", "3. alerts", "4. numbers"], 
    ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"], 
    ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"]
];

function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if(timeLeft === 0 || questionNumber === 5) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function displayQuestion() {
    // display question in h1El
    h1El.textContent = questions[questionNumber].q;
    
    // display answer choices
    for(var i = 0; i < 4; i++) {
        choiceButton[i].textContent = choices[questionNumber][i];
    }

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
            choiceButton[i] = document.createElement("button");
            choiceButton[i].textContent = choices[questionNumber][i];
            choiceButton[i].className = "choiceButton";
            divEl.appendChild(choiceButton[i]);
    }
    // display question 1
    displayQuestion();
});

function removeMessage() {
    var h2El = document.querySelector("h2");
    h2El.remove();
}

function correct() {
    questionNumber++;

    if(questionNumber === 5) {
        gameOver();
    }
    else {
        displayQuestion();
    }

    // tell user they are correct
    var correctMessageEl = document.createElement("h2");
    correctMessageEl.textContent = "Correct!";
    divEl.appendChild(correctMessageEl);

    // remove message after 1 second
    setTimeout(removeMessage, 1000);
}

function incorrect() {
    questionNumber++;
    // decrease time by 10 seconds for penalty
    timeLeft -= 10;

    if(questionNumber === 5) {
        gameOver();
    }
    else {
        displayQuestion();
        
    }

    // tell user they are incorrect
    var incorrectMessageEl = document.createElement("h2");
    incorrectMessageEl.textContent = "Wrong!";
    divEl.appendChild(incorrectMessageEl);

    // remove message after 1 second
    setTimeout(removeMessage, 1000);
}

function gameOver() {
    h1El.textContent = "All done!";

    // remove choiceButton elements
    for(var i = 0; i < choiceButton.length; i++) {
        choiceButton[i].remove();
    }

    // display score
    var scoreStatementEl = document.createElement("p");
    scoreStatementEl.textContent = "Your final score is: " + timeLeft;
    scoreStatementEl.className = "game-over";
    divEl.appendChild(scoreStatementEl);

    // initials div
    var initialDivEl = document.createElement("div");
    initialDivEl.className = "initials";
    divEl.appendChild(initialDivEl);
    // tells user to input initials
    var initialPromptEl = document.createElement("p");
    initialPromptEl.className = "game-over";
    initialPromptEl.id = "prompt";
    initialPromptEl.textContent = "Enter initials: ";
    initialDivEl.appendChild(initialPromptEl);
    // text input for initials
    var initialInput = document.createElement("input");
    initialDivEl.appendChild(initialInput);
    // submit button
    var submitButtonEl = document.createElement("button");
    submitButtonEl.setAttribute("type", "submit");
    submitButtonEl.textContent = "Submit";
    console.log(submitButtonEl);
    initialDivEl.appendChild(submitButtonEl);
}

if(timeLeft === 0) {
    gameOver();
}

divEl.addEventListener("click", function(event) {
    var userChoice = event.target;
    if(userChoice.className != "choiceButton") {
        return;
    }
    else if(userChoice.textContent === questions[questionNumber].a) {
        correct();
    }
    else {
        incorrect();
    }
});