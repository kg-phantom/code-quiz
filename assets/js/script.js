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
        timerEl = document.querySelector("#timer");
        
        if(timeLeft <= 0 || questionNumber === 5) {
            clearInterval(timerInterval);
            gameOver();
        }
        else if(!timerEl) {
            clearInterval(timerInterval);
            return;
        }
        timerEl.textContent = "Time: " + timeLeft;
    }, 1000)
}

function startPage() {
    timeLeft = 75;
    questionNumber = 0;

    // remove high score page elements
    document.querySelector("ol").remove();
    while(document.querySelector("button")) {
        document.querySelector("button").remove();
    }

    if(divEl.querySelector("p")) {
        divEl.querySelector("p").remove();
    }

    // recreate header 'view high scores' button, timer, h1, intro paragraph, and start button
    var viewHighScoresEl = document.createElement("button");
    viewHighScoresEl.id = "view-high-scores";
    viewHighScoresEl.textContent = "View high scores";
    headerEl.appendChild(viewHighScoresEl);

    viewHighScoresEl.addEventListener("click", displayHighScores);

    timerEl = document.createElement("p");
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
    if(!questions[questionNumber]) {
        return;
    }

    // display question in h1El
    h1El.textContent = questions[questionNumber].q;
    
    // display answer choices
    for(var i = 0; i < 4; i++) {
        choiceButton[i].textContent = choices[questionNumber][i];
    }
}

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

function removeMessage() {
    var h2El = document.querySelector("h2");
    h2El.remove();
}

function correct() {
    questionNumber++;

    if(timeLeft > 0 || questionNumber < 4) {
        displayQuestion();
    }

    // tell user they are correct
    var correctMessageEl = document.createElement("h2");
    correctMessageEl.textContent = "Correct!";
    divEl.appendChild(correctMessageEl);

    // remove message after .5 seconds
    setTimeout(removeMessage, 500);
}

function incorrect() {
    questionNumber++;
    // decrease time by 10 seconds for penalty
    timeLeft -= 10;

    if(timeLeft > 0 || questionNumber < 4) {
        displayQuestion();
    }

    // tell user they are incorrect
    var incorrectMessageEl = document.createElement("h2");
    incorrectMessageEl.textContent = "Wrong!";
    divEl.appendChild(incorrectMessageEl);

    // remove message after .5 seconds
    setTimeout(removeMessage, 500);
}

function displayHighScores() {
    h1El.textContent = "High Scores";
    h1El.style.textAlign = "left";

    // remove previous elements
    if(document.querySelector("form")) {
        document.querySelector(".game-over").remove();
        document.querySelector("form").remove();
    }
    
    while(document.querySelector("p")) {
        document.querySelector("p").remove();
    }

    while(document.querySelector("button")) {
        document.querySelector("button").remove();
    }

    highScores = localStorage.getItem("highscores");

    var highScoreListEl = document.createElement("ol");
    divEl.appendChild(highScoreListEl);  

    if(!highScores) {
        // say there are no scores yet
        var NoScoresEl = document.createElement("p");
        NoScoresEl.className = "game-over";
        NoScoresEl.textContent = "There are no high scores yet!";
        divEl.appendChild(NoScoresEl);
        var backButtonEl = document.createElement("button");
        backButtonEl.className = "high-scores";
        backButtonEl.id = "back-btn";
        backButtonEl.textContent = "Go back";
        divEl.appendChild(backButtonEl);
        backButtonEl.addEventListener("click", startPage);
        highScores = [];
        return false;
    }

    highScores = JSON.parse(highScores);

    for(var i = 0; i < highScores.length; i++) {
        var highScoreListItem = document.createElement("li");
        highScoreListItem.textContent = highScores[i].initials + " - " + highScores[i].score;
        highScoreListEl.appendChild(highScoreListItem);
    }
    
    divEl.appendChild(highScoreListEl);
    // back button
    var backButtonEl = document.createElement("button");
    backButtonEl.className = "high-scores";
    backButtonEl.id = "back-btn";
    backButtonEl.textContent = "Go back";
    divEl.appendChild(backButtonEl);
    // clear high scores button
    var clearScoresButtonEl = document.createElement("button");
    clearScoresButtonEl.id = "clear-btn";
    clearScoresButtonEl.className = "high-scores";
    clearScoresButtonEl.textContent = "Clear high scores";
    divEl.appendChild(clearScoresButtonEl);
    
    backButtonEl.addEventListener("click", startPage);
    clearScoresButtonEl.addEventListener("click", clearScores);
}

function clearScores() {
    highScores = [];
    localStorage.setItem("highscores", "");

    alert("High scores cleared!");
    startPage();  
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

    timerEl.textContent = "Time: " + timeLeft;

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
    
    // create object for initial input and score
    var savedInitialObj = {
        initials: savedInitial.value,
        score: timeLeft
    }
    
    // add to array of high scores
    highScores.push(savedInitialObj);
    localStorage.setItem("highscores", JSON.stringify(highScores));

    displayHighScores();
}

viewHighScoresEl.addEventListener("click", displayHighScores);

startButton.addEventListener("click", startQuiz);

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