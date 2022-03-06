// Global variables
let firstPlayerName;
let secondPlayerName;
let firstPlayerSymbol;
let secondPlayerSymbol;
let gameGridMarkerFirstPlayer;
let gameGridMarkerSecondPlayer;

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
        gameGridMarkerFirstPlayer = 'X';
        gameGridMarkerSecondPlayer = 'O';
    }
    else if (checkedRadio.value == 'o') {
        firstPlayerSymbol = checkedRadio.value = 'circle';
        secondPlayerSymbol = checkedRadio.value = 'cross';
        gameGridMarkerFirstPlayer = 'o';
        gameGridMarkerSecondPlayer = 'X';
    }
    // Validate form of second player.
    else if (checkedRadio != null && firstPlayerName != '' && secondPlayerName == '') {
        alert('Gebe einen Namen ein!');
        return false;
    }

    // Change scoreboard text.
    document.getElementById('first-player-form').style.display = 'none';
    document.getElementById('second-player-form').style.display = 'block';
    
    
    // Start game.
    if (secondPlayerName != '') {
        startGame();
    }
}