// Global variables
let scoreFirstPlayer = 0;
let scoreSecondPlayer = 0;
let numberOfRounds = 0;

/*
The winner will be determined.
The player who was able to place his symbol in a row, column or diagonal first wins.
*/
function determineWinner(gameGrid, index) {
    // Possible winning situations.
    let value = gameGrid[index];
    // Rows
    let rowOneIsTrue = gameGrid[0] === value && gameGrid[1] === value && gameGrid[2] === value;
    let rowTwoIsTrue = gameGrid[3] === value && gameGrid[4] === value && gameGrid[5] === value;
    let rowThreeIsTrue = gameGrid[6] === value && gameGrid[7] === value && gameGrid[8] === value;
    // Columns
    let columnOneIsTrue = gameGrid[0] === value && gameGrid[3] === value && gameGrid[6] === value;
    let columnTwoIsTrue = gameGrid[1] === value && gameGrid[4] === value && gameGrid[7] === value;
    let columnThreeIsTrue = gameGrid[2] === value && gameGrid[5] === value && gameGrid[8] === value;
    // Diagonals
    let diagonalOneIsTrue = gameGrid[0] === value && gameGrid[4] === value && gameGrid[8] === value;
    let diagonalTwoIsTrue = gameGrid[2] === value && gameGrid[4] === value && gameGrid[6] === value;
    
    // Function to determine the winning fields and then color them.
    function changeFieldColor(startIndex, endIndex) {
        let field = document.getElementsByClassName('tictactoe-field');
        let highlightingColor = '#148226';

        field[startIndex].style.backgroundColor = highlightingColor;
        field[endIndex].style.backgroundColor = highlightingColor;

        // First check diagonals
        if ( diagonalTwoIsTrue || diagonalOneIsTrue) {
            field[4].style.backgroundColor = highlightingColor;
        }
        // Then check rows and columns. 1 is added to the indexes because 0 has no Least Common Multiple.
        else if ( 28 % (startIndex + 1) == 0 && 18 % (endIndex + 1) == 0 ) {
            field[startIndex + 1].style.backgroundColor = highlightingColor;
        }
        else if ( 6 % (startIndex + 1) == 0 && 504 % (endIndex + 1) == 0) {
            field[startIndex + 3].style.backgroundColor = highlightingColor;
        }
    }
    
    // Function to determine winner and adjust scoreboard and game master text.
    let scoreboardFirstPlayer = document.querySelectorAll('#scoreboard-table th')[1];
    let scoreboardSecondPlayer = document.querySelectorAll('#scoreboard-table th')[2];
    let gameMasterText = document.getElementById('game-master-text');

    function indicateWinner() {
        let firstMarkerCounter = 0;
        let secondMarkerCounter = 0;
        let tableDataFirstPlayer = document.querySelectorAll('#scoreboard-table td')[0];
        let tableDataSecondPlayer = document.querySelectorAll('#scoreboard-table td')[1];
        let scoreboardWinningColor = 'red';

        // Count marker in game grid array.
        for (let i = 0; i < gameGrid.length; i++) {
            if (gameGrid[i].includes(gameGridMarkerFirstPlayer) == true) {
                firstMarkerCounter++;
            }
            else if (gameGrid[i].includes(gameGridMarkerSecondPlayer) == true) {
                secondMarkerCounter++;
            }
        }

        // Functions to adjust game master text and scoreboard.
        function firstPlayerWins() {
            scoreboardFirstPlayer.style.backgroundColor = scoreboardWinningColor;
            scoreboardSecondPlayer.style.backgroundColor = 'unset';
            gameMasterText.innerText = firstPlayerName + ' hat gewonnen!';
            scoreFirstPlayer += 1;
            tableDataFirstPlayer.innerText = scoreFirstPlayer;
            document.getElementById('start-button').style.display = 'initial';
        }

        function secondPlayerWins() {
            scoreboardFirstPlayer.style.backgroundColor = 'unset';
            scoreboardSecondPlayer.style.backgroundColor = scoreboardWinningColor;
            gameMasterText.innerText = secondPlayerName + ' hat gewonnen!';
            scoreSecondPlayer += 1;
            tableDataSecondPlayer.innerText = scoreSecondPlayer;
            document.getElementById('start-button').style.display = 'initial';
        }

        // Determine winner. Adjust game master text and scoreboard.
        if (numberOfRounds % 2 == 1 && firstMarkerCounter > secondMarkerCounter ||
            numberOfRounds % 2 == 0 && firstMarkerCounter == secondMarkerCounter) {
            firstPlayerWins();
        }
        else if (numberOfRounds % 2 == 1 && firstMarkerCounter == secondMarkerCounter ||
                 numberOfRounds % 2 == 0 && firstMarkerCounter < secondMarkerCounter) {
            secondPlayerWins();
        }
        
    }

    // Block board after the game ends.
    function noMoreMoves() {
        document.getElementById('tictactoe-grid').style.pointerEvents = 'none';
    }
    
    // Determine winner and adjust game.
    switch (true) {

        // Check diagonals.
        case diagonalOneIsTrue:
            changeFieldColor(0,8);
            noMoreMoves();
            indicateWinner()
        break;
        case diagonalTwoIsTrue:
            changeFieldColor(2,6);
            noMoreMoves();
            indicateWinner()
        break;

        // Check Rows.
        case rowOneIsTrue:
            changeFieldColor(0,2);
            noMoreMoves();
            indicateWinner()
        break;
        case rowTwoIsTrue:
            changeFieldColor(3,5);
            noMoreMoves();
            indicateWinner()
        break;
        case rowThreeIsTrue:
            changeFieldColor(6,8);
            noMoreMoves();
            indicateWinner()
        break;

        // Check Columns.
        case columnOneIsTrue:
            changeFieldColor(0,6);
            noMoreMoves();
            indicateWinner()
        break;
        case columnTwoIsTrue:
            changeFieldColor(1,7);
            noMoreMoves();
            indicateWinner()
        break;
        case columnThreeIsTrue:
            changeFieldColor(2,8);
            noMoreMoves();
            indicateWinner()
        break;
        
        // Drawn match.
        case !gameGrid.includes('-'):
            noMoreMoves();
            scoreboardFirstPlayer.style.backgroundColor = "unset";
            scoreboardSecondPlayer.style.backgroundColor = "unset";
            gameMasterText.innerText = 'Das Spiel endet unentschieden!';
        break;
    }   
}