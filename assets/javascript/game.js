var spongeWords = ["spongebob", "squidward", "plankton", "sandy", "patrick", "gary", "pineapple", "jellyfish"];     //creates a list of possible words
var totalGuesses = 9;      // number of tries
var userGuesses = [];       // letters the user guessed
var computerPick;           // random word selected
var wordGuessed = [];       // This will be the word we actually build to match the current word
var guessesLeft = 9;        // How many tries the player has left
var gameOver = true;   // Flag for 'press any key to try again'     
var wins = 0;               //wins


function newGame() {
    //starts game
    guessesLeft = totalGuesses;

    //picks a random spongeWord
    computerPick = Math.floor(Math.random() * (spongeWords.length));

    //empties arrays on restart
    userGuesses = [];
    wordGuessed = [];

    //makes underscores
    for (var i = 0; i < spongeWords[computerPick].length; i++) {
        wordGuessed.push(" _ ");
    }   

    //calls refresh function below
    refresh();
};

//refreshes the game
function refresh() {

    document.getElementById("winsNumber").innerHTML = wins;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    document.getElementById("wordLetters").innerText = guessingWordText;
    document.getElementById("guessesNumber").innerText = guessesLeft;
    document.getElementById("lettersGuessed").innerText = userGuesses;
}

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < spongeWords[computerPick].length; i++) {
        if(spongeWords[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};

//check if all letters have been entered.
function checkWin() {
    if(wordGuessed.indexOf(" _ ") === -1) {
        wins++;
        refresh();
        gameOver = true;
        document.getElementById("instructions").innerHTML = "YOU WIN! PRESS ANY KEY TO START AGAIN"
    }
};

//check if the user is out of guesses
function checkLoss(){
    if(guessesLeft <= 0) {
        gameOver = true;
        document.getElementById("instructions").innerHTML = "LOSER! PRESS ANY KEY TO START AGAIN"
    }
    console.log(guessesLeft)
};

//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Event listener
document.onkeydown = function(event) {
    //if the game is finished, restart it.
    if(gameOver) {
        newGame();
        gameOver = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            refresh();
            checkWin();
            checkLoss();
        }
    }
};



