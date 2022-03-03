// Global variables
let firstPlayerName;
let secondPlayerName;
let firstPlayerSymbol;
let secondPlayerSymbol;
let gameGridMarkFirstPlayer;
let gameGridMarkSecondPlayer;


/*
Before the game starts,
the name of the first player and his symbol are set.
Then the second player enters his name.
*/
function getValues() {
    firstPlayerName = document.querySelector('#first-player').value;
    secondPlayerName = document.querySelector('#second-player').value;
    let checkedRadio = document.querySelector('input[name="choose-symbol"]:checked');
    
    // Validate form of first player.
    if (checkedRadio == null || firstPlayerName == '') {
        alert('Gebe einen Namen ein und wähle dein Symbol aus!');
        return false;
    }
    // Set symbols.
    else if (checkedRadio.value == 'x') {
        firstPlayerSymbol = checkedRadio.value = 'cross';
        secondPlayerSymbol = checkedRadio.value = 'circle';
        gameGridMarkFirstPlayer = 'x';
        gameGridMarkSecondPlayer = 'o';
    }
    else if (checkedRadio.value == 'o') {
        firstPlayerSymbol = checkedRadio.value = 'circle';
        secondPlayerSymbol = checkedRadio.value = 'cross';
        gameGridMarkFirstPlayer = 'o';
        gameGridMarkSecondPlayer = 'x';
    }
    // Validate form of second player.
    else if (checkedRadio != null && firstPlayerName != '' && secondPlayerName == '') {
        alert('Gebe einen Namen ein!');
        return false;
    }

    // Change scoreboard text.
    function changeGamemasterText (divIdOne, divIdTwo) {
        document.getElementById(divIdOne).style.display = 'none';
        document.getElementById(divIdTwo).style.display = 'block';
    }
    changeGamemasterText ('first-player-form', 'second-player-form');
    
    // Start game.
    if (secondPlayerName != '') {
        startGame();
    }
}