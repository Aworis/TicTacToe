/*
The game begins.
To do this, the game grid is prepared, the formatting of the page is adjusted
and it is determined which player has to move which symbol.
*/
function startGame() {
    // Prepare scoreboard.
    let gameMasterText = document.getElementById('game-master-text');
    gameMasterText.innerHTML = firstPlayerName + ' ist am Zug.';
    document.getElementById('second-player-form').style.display = 'none';

    document.getElementById('start-button').style.display = 'initial';

    document.getElementById('scoreboard-table').style.display = 'table';
    document.getElementById('tictactoe-grid').style.pointerEvents = 'auto';
    
    let scoreboardFirstPlayer = document.querySelectorAll('#scoreboard-table th')[0];
    let scoreboardSecondPlayer = document.querySelectorAll('#scoreboard-table th')[1];
    let scoreboardHighlightColor = '#0d3614';
    scoreboardFirstPlayer.innerHTML = firstPlayerName + ' ' + gameGridMarkFirstPlayer;
    scoreboardSecondPlayer.innerHTML = secondPlayerName + ' ' + gameGridMarkSecondPlayer;
    scoreboardFirstPlayer.style.backgroundColor = scoreboardHighlightColor;
    scoreboardSecondPlayer.style.backgroundColor = 'unset';

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


    // Get the node of the clicked field to be able to set the symbol.
    let tictactoeGrid = document.getElementById('tictactoe-grid');

    for (let i = 0; i < tictactoeGrid.children.length; i++) {
        (function(index) {
            tictactoeGrid.children[i].onclick = function(){

                let symbol = document.createElement('div');
                let numberOfFirstPlayerSymbol = document.querySelectorAll('#tictactoe-grid .tictactoe-field .' + firstPlayerSymbol).length;
                let numberOfSecondPlayerSymbol = document.querySelectorAll('#tictactoe-grid .tictactoe-field .' + secondPlayerSymbol).length;
                
                // Check which player's turn it is and highlight their name on the scoreboard.
                if ( numberOfFirstPlayerSymbol == null) {
                    scoreboardFirstPlayer.style.backgroundColor = scoreboardHighlightColor;
                    gameMasterText.innerHTML = firstPlayerName + ' ist am Zug.';
                }
                else if ((numberOfFirstPlayerSymbol + numberOfSecondPlayerSymbol) % 2 == 0) {
                    scoreboardSecondPlayer.style.backgroundColor = scoreboardHighlightColor;
                    scoreboardFirstPlayer.style.backgroundColor = 'unset';
                    gameMasterText.innerHTML = secondPlayerName + ' ist am Zug.';
                } else {
                    scoreboardFirstPlayer.style.backgroundColor = scoreboardHighlightColor;
                    scoreboardSecondPlayer.style.backgroundColor = 'unset';
                    gameMasterText.innerHTML = firstPlayerName + ' ist am Zug.';
                }
                
                // Check which symbol should be set first.
                if (numberOfFirstPlayerSymbol == 0) {
                    switch (true) {
                        case firstPlayerSymbol == 'cross':
                            symbol.classList.add(firstPlayerSymbol);
                            tictactoeGrid.children[index].appendChild(symbol);
                            gameGrid[index] = gameGridMarkFirstPlayer;
                        break;
                        case firstPlayerSymbol == 'circle':
                            symbol.classList.add(firstPlayerSymbol);
                            tictactoeGrid.children[index].appendChild(symbol);
                            gameGrid[index] = gameGridMarkFirstPlayer;
                        break;
                    }
                }

                // Check which player's turn it is.
                else if (numberOfFirstPlayerSymbol == numberOfSecondPlayerSymbol) {
                    if (tictactoeGrid.children[index].children.length < 1) {
                        symbol.classList.add(firstPlayerSymbol);
                        tictactoeGrid.children[index].appendChild(symbol);
                        gameGrid[index] = gameGridMarkFirstPlayer;
                    }
                }
                else {
                    if (tictactoeGrid.children[index].children.length < 1) {
                        symbol.classList.add(secondPlayerSymbol);
                        tictactoeGrid.children[index].appendChild(symbol);
                        gameGrid[index] = gameGridMarkSecondPlayer;
                    }
                }

                // Determine winner.
                determineWinner(gameGrid, index);
            } 
        })(i);    
    }
}