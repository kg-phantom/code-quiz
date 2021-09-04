var headerEl = document.querySelector("header");
var viewHighScoresEl = document.querySelector("#view-high-scores");
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

var highScores = [];

function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        let timerEl = document.querySelector("#timer");
        timerEl.textContent = "Time: " + timeLeft;
        if(timeLeft === 0 || questionNumber === 5) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function startPage() {
    timeLeft = 75;
    questionNumber = 0;

    // remove high score page elements
    document.querySelector("ol").remove();
    while(document.querySelector("button")) {
        document.querySelector("button").remove();
    }
    // recreate header 'view high scores' button, timer, h1, intro paragraph, and start button
    var viewHighScoresEl = document.createElement("button");
    viewHighScoresEl.id = "view-high-scores";
    viewHighScoresEl.textContent = "View high scores";
    headerEl.appendChild(viewHighScoresEl);

    viewHighScoresEl.addEventListener("click", displayHighScores);

    var timerEl = document.createElement("p");
    timerEl.id = "timer";
    timerEl.textContent = "Time: " + timeLeft;
    headerEl.appendChild(timerEl);

    h1El.textContent = "Code Quiz Challenge";
    h1El.style.textAlign = "center";
    var introEl = document.createElement("p");
    introEl.id = "intro";
    introEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    divEl.appendChild(introEl);
    
    var startButton = document.createElement("button");
    startButton.id = "start-btn";
    startButton.textContent = "Start Quiz";
    divEl.appendChild(startButton);

    startButton.addEventListener("click", startQuiz);
}

function displayQuestion() {
    // display question in h1El
    h1El.textContent = questions[questionNumber].q;
    
    // display answer choices
    for(var i = 0; i < 4; i++) {
        choiceButton[i].textContent = choices[questionNumber][i];
    }

}

viewHighScoresEl.addEventListener("click", displayHighScores);

function startQuiz() {
    // remove startButton and opening instructions
    let startButton = document.querySelector("#start-btn");
    let introEl = document.querySelector("#intro");
    startButton.remove();
    introEl.remove();
    
    // start timer
    startTimer();

    // add .question class to h1
    h1El.style.textAlign = "left";
    
    // create buttons for answer choices
    for(var i = 0; i < 4; i++) {
            choiceButton[i] = document.createElement("button");
            choiceButton[i].textContent = choices[questionNumber][i];
            choiceButton[i].className = "choiceButton";
            divEl.appendChild(choiceButton[i]);
    }
    // display question 1
    displayQuestion();
}

startButton.addEventListener("click", startQuiz);

function removeMessage() {
    var h2El = document.querySelector("h2");
    h2El.remove();
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

function displayHighScores() {
    h1El.textContent = "High Scores";
    h1El.style.textAlign = "left";

    if(document.querySelector("form")) {
        document.querySelector(".game-over").remove();
        document.querySelector("form").remove();
    }
    
    while(document.querySelector("p") && document.querySelector("button")) {
        document.querySelector("p").remove();
        document.querySelector("button").remove();
    }

    var highScoreListEl = document.createElement("ol");

    highScores = localStorage.getItem("highscores");
    console.log(highScores);

    if(!highScores) {
        highScores = [];
        return;
    }

    highScores = JSON.parse(highScores);

    for(var i = 0; i < highScores.length; i++) {
        var highScoreListItem = document.createElement("li");
        highScoreListItem.textContent = highScores[i].initials + " - " + highScores[i].score;
        highScoreListEl.appendChild(highScoreListItem);
    }
    
    divEl.appendChild(highScoreListEl);

    var backButtonEl = document.createElement("button");
    backButtonEl.className = "high-scores";
    backButtonEl.id = "back-btn";
    backButtonEl.textContent = "Go back";
    divEl.appendChild(backButtonEl);

    var clearScoresButtonEl = document.createElement("button");
    clearScoresButtonEl.id = "clear-btn";
    clearScoresButtonEl.className = "high-scores";
    clearScoresButtonEl.textContent = "Clear high scores";
    divEl.appendChild(clearScoresButtonEl);
    
    backButtonEl.addEventListener("click", startPage);
}

function gameOver() {
    h1El.textContent = "All done!";

    // remove choiceButton elements
    for(var i = 0; i < choiceButton.length; i++) {
        choiceButton[i].remove();
    }

    // display score
    var scoreStatementEl = document.createElement("p");
    scoreStatementEl.textContent = "Your final score is: " + (timeLeft - 1);
    scoreStatementEl.className = "game-over";

    divEl.appendChild(scoreStatementEl);

    // initials div
    var initialFormEl = document.createElement("form");
    initialFormEl.className = "initials";

    divEl.appendChild(initialFormEl);
    // tells user to input initials
    var initialPromptEl = document.createElement("p");
    initialPromptEl.className = "game-over";
    initialPromptEl.id = "prompt";
    initialPromptEl.textContent = "Enter initials: ";

    initialFormEl.appendChild(initialPromptEl);
    // text input for initials
    var initialInput = document.createElement("input");

    initialFormEl.appendChild(initialInput);
    // submit button
    var submitButtonEl = document.createElement("button");
    submitButtonEl.setAttribute("type", "submit");
    submitButtonEl.textContent = "Submit";
    submitButtonEl.id = "submit";

    initialFormEl.appendChild(submitButtonEl);

    initialFormEl.addEventListener("submit", saveHighScore);
}

function saveHighScore(event) {
    event.preventDefault();
    var savedInitial = document.querySelector("input");

    // check if savedInitial is empty string
    if(!savedInitial.value) {
        alert("You need to type your initials!");
        return;
    }
    
    var savedInitialObj = {
        initials: savedInitial.value,
        score: (timeLeft - 1)
    }

    highScores.push(savedInitialObj);
    console.log(highScores);
    localStorage.setItem("highscores", JSON.stringify(highScores));
    console.log(localStorage.getItem("highscores"));

    displayHighScores();
}

if(timeLeft === 0) {
    gameOver();
}