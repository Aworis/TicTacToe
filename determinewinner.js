/*
The winner will be determined.
The player who was able to place his symbol in a row, column or diagonal first wins.
*/
function determineWinner(gameGrid, index) {
    // Possible winning situations.
    let value = gameGrid[index];

    let rowOneIsTrue = gameGrid[0] === value && gameGrid[1] === value && gameGrid[2] === value;
    let rowTwoIsTrue = gameGrid[3] === value && gameGrid[4] === value && gameGrid[5] === value;
    let rowThreeIsTrue = gameGrid[6] === value && gameGrid[7] === value && gameGrid[8] === value;

    let columnOneIsTrue = gameGrid[0] === value && gameGrid[3] === value && gameGrid[6] === value;
    let columnTwoIsTrue = gameGrid[1] === value && gameGrid[4] === value && gameGrid[7] === value;
    let columnThreeIsTrue = gameGrid[2] === value && gameGrid[5] === value && gameGrid[8] === value;

    let diagonalOneIsTrue = gameGrid[0] === value && gameGrid[4] === value && gameGrid[8] === value;
    let diagonalTwoIsTrue = gameGrid[2] === value && gameGrid[4] === value && gameGrid[6] === value;
    
    function changeFieldColor(startIndex, endIndex) {
        let field = document.getElementsByClassName('tictactoe-field');
        let highlightingColor = '#148226';

        field[startIndex].style.backgroundColor = highlightingColor;
        field[endIndex].style.backgroundColor = highlightingColor;

        // First check diagonals
        if ( diagonalTwoIsTrue || diagonalOneIsTrue) {
            field[4].style.backgroundColor = highlightingColor;
        }
        // Then check rows and columns. Calculation with the Least Common Multiple. 1 is added to the indexes because 0 has no LCM.
        else if ( 28 % (startIndex + 1) == 0 && 18 % (endIndex + 1) == 0 ) {
            field[startIndex + 1].style.backgroundColor = highlightingColor;
        }
        else if ( 6 % (startIndex + 1) == 0 && 504 % (endIndex + 1) == 0) {
            field[startIndex + 3].style.backgroundColor = highlightingColor;
        }
    }
    
    // Function to determine winner and adjust scoreboard and game master text.
    function indicateWinner() {
        let firstCounter = 0;
        let secondCounter = 0;
        let scoreboardFirstPlayer = document.querySelectorAll('#scoreboard-table th')[0];
        let scoreboardSecondPlayer = document.querySelectorAll('#scoreboard-table th')[1];
        
        let tableDataFirstPlayer = document.querySelectorAll('#scoreboard-table td')[0];
        let tableDataSecondPlayer = document.querySelectorAll('#scoreboard-table td')[1];

        
        let gameMasterText = document.getElementById('game-master-text');
        let scoreboardWinningColor = 'red';


        // Adjust scoreboard and game master text.
        

        for (let i = 0; i < gameGrid.length; i++) {
            if (gameGrid[i].includes(gameGridMarkFirstPlayer) == true) {
                firstCounter++;
            }
            else if (gameGrid[i].includes(gameGridMarkSecondPlayer) == true) {
                secondCounter++;
            }
        }

        if (firstCounter > secondCounter) {
            scoreboardFirstPlayer.style.backgroundColor = scoreboardWinningColor;
            scoreboardSecondPlayer.style.backgroundColor = 'unset';
            gameMasterText.innerText = firstPlayerName + ' hat gewonnen!';
            scoreFirstPlayer += 1;
            tableDataFirstPlayer.innerText = scoreFirstPlayer;
        } else if (firstCounter == secondCounter) {
            scoreboardFirstPlayer.style.backgroundColor = 'unset';
            scoreboardSecondPlayer.style.backgroundColor = scoreboardWinningColor;
            gameMasterText.innerText = secondPlayerName + ' hat gewonnen!';
            scoreSecondPlayer += 1;
            tableDataSecondPlayer.innerText = scoreSecondPlayer;
        }
    }

    // Block board after the game ends.
    function noMoreMoves() {
        document.getElementById('tictactoe-grid').style.pointerEvents = 'none';
    }
    
    // Determine winner.
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
            document.querySelectorAll('#scoreboard-table th')[0].style.backgroundColor = "unset";
            document.querySelectorAll('#scoreboard-table th')[1].style.backgroundColor = "unset";
            document.getElementById('game-master-text').innerText = 'Das Spiel endet unentschieden!';
        break;
    }   
}