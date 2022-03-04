/*
The game begins.
To do this, the game grid is prepared, the formatting of the page is adjusted
and it is determined which player has to move which symbol.
*/
function startGame() {
    // Adjust scoreboard.
    let gameMasterText = document.getElementById('game-master-text');
    gameMasterText.innerText = firstPlayerName + ' ist am Zug.';
    document.getElementById('second-player-form').style.display = 'none';

    document.getElementById('start-button').style.display = 'none';

    document.getElementById('scoreboard-table').style.display = 'table';
    document.getElementById('tictactoe-grid').style.pointerEvents = 'auto';
    
    let scoreboardFirstPlayer = document.querySelectorAll('#scoreboard-table th')[1];
    let scoreboardSecondPlayer = document.querySelectorAll('#scoreboard-table th')[2];
    let scoreboardHighlightColor = '#0d3614';
    scoreboardFirstPlayer.innerText = firstPlayerName + ' ' + gameGridMarkerFirstPlayer;
    scoreboardSecondPlayer.innerText = secondPlayerName + ' ' + gameGridMarkerSecondPlayer;
    scoreboardFirstPlayer.style.backgroundColor = scoreboardHighlightColor;
    scoreboardSecondPlayer.style.backgroundColor = 'unset';

    // Adjust round counter in scoreboard.
    let scoreboardRoundCounter = document.querySelectorAll('#scoreboard-table th')[0];
    numberOfRounds++;
    scoreboardRoundCounter.innerText = 'Runde ' + numberOfRounds;

    // Prepare gameGrid.
    let gameGrid = [];
    for (let i = 0; i <= 8; i++) {
        gameGrid[i] = '-';
    }

    // Reset board for a new game.
    let tictactoeBoard = document.getElementById('tictactoe-grid').children;
    for (let i = 0; i < tictactoeBoard.length; i++) {
        if (tictactoeBoard[i].children.length >= 1) {
            tictactoeBoard[i].firstChild.remove();
            document.getElementsByClassName('tictactoe-field')[i].style.backgroundColor = '#ffffffcc';
        }
    }

    // Check which player goes first and adjust scoreboard
    if (numberOfRounds % 2 == 1) {
        scoreboardFirstPlayer.style.backgroundColor = scoreboardHighlightColor;
        scoreboardSecondPlayer.style.backgroundColor = 'unset';
        gameMasterText.innerText = firstPlayerName + ' ist am Zug.';
    }
    else if (numberOfRounds % 2 == 0) {
        scoreboardSecondPlayer.style.backgroundColor = scoreboardHighlightColor;
        scoreboardFirstPlayer.style.backgroundColor = 'unset';
        gameMasterText.innerText = secondPlayerName + ' ist am Zug.';
    }

    // Get the node of the clicked field to be able to set the symbol.
    let tictactoeGrid = document.getElementById('tictactoe-grid');

    for (let i = 0; i < tictactoeGrid.children.length; i++) {
        (function(index) {
            tictactoeGrid.children[i].onclick = function(){

                let symbol = document.createElement('div');
                let numberOfFirstPlayerSymbol = document.querySelectorAll('#tictactoe-grid .tictactoe-field .' + firstPlayerSymbol).length;
                let numberOfSecondPlayerSymbol = document.querySelectorAll('#tictactoe-grid .tictactoe-field .' + secondPlayerSymbol).length;
                let numberOfSymbols = numberOfFirstPlayerSymbol + numberOfSecondPlayerSymbol;
                let blankField = tictactoeGrid.children[index].children.length < 1;

                /* Check which symbol should be set first. */
                // If it's the first player's first turn, do this:
                if (numberOfRounds % 2 == 1 && blankField && numberOfSymbols == 0) {
                    symbol.classList.add(firstPlayerSymbol);
                    tictactoeGrid.children[index].appendChild(symbol);
                    gameGrid[index] = gameGridMarkerFirstPlayer;

                    scoreboardSecondPlayer.style.backgroundColor = scoreboardHighlightColor;
                    scoreboardFirstPlayer.style.backgroundColor = 'unset';
                    gameMasterText.innerText = secondPlayerName + ' ist am Zug.';
                }
                // If it's the second player's first turn, do this:
                else if (numberOfRounds % 2 == 0 && blankField && numberOfSymbols == 0){
                    symbol.classList.add(secondPlayerSymbol);
                    tictactoeGrid.children[index].appendChild(symbol);
                    gameGrid[index] = gameGridMarkerSecondPlayer;

                    scoreboardFirstPlayer.style.backgroundColor = scoreboardHighlightColor;
                    scoreboardSecondPlayer.style.backgroundColor = 'unset';
                    gameMasterText.innerText = firstPlayerName + ' ist am Zug.';
                }
                
                /* Check which symbol should be set next. */
                // If it's the second player's next turn, do this:
                else if (numberOfRounds % 2 == 1 && blankField && numberOfFirstPlayerSymbol == numberOfSecondPlayerSymbol ||
                         numberOfRounds % 2 == 0 && blankField && numberOfFirstPlayerSymbol < numberOfSecondPlayerSymbol) {
                    symbol.classList.add(firstPlayerSymbol);
                    tictactoeGrid.children[index].appendChild(symbol);
                    gameGrid[index] = gameGridMarkerFirstPlayer;

                    scoreboardSecondPlayer.style.backgroundColor = scoreboardHighlightColor;
                    scoreboardFirstPlayer.style.backgroundColor = 'unset';
                    gameMasterText.innerText = secondPlayerName + ' ist am Zug.';
                }
                // If it's the first player's next turn, do this:
                else if (numberOfRounds % 2 == 1 && blankField && numberOfFirstPlayerSymbol > numberOfSecondPlayerSymbol ||
                         numberOfRounds % 2 == 0 && blankField && numberOfFirstPlayerSymbol == numberOfSecondPlayerSymbol) {
                    symbol.classList.add(secondPlayerSymbol);
                    tictactoeGrid.children[index].appendChild(symbol);
                    gameGrid[index] = gameGridMarkerSecondPlayer;

                    scoreboardFirstPlayer.style.backgroundColor = scoreboardHighlightColor;
                    scoreboardSecondPlayer.style.backgroundColor = 'unset';
                    gameMasterText.innerText = firstPlayerName + ' ist am Zug.';
                }

                // Determine winner.
                determineWinner(gameGrid, index);
            } 
        })(i);    
    }
}