    const grid = document.querySelector('.grid');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const turnHeading = document.querySelector('.turn');
    const restartBtn = document.querySelector('#restart-btn');
    const winnerAlert = document.querySelector('#winner-alert');

    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function handleCellClick(e) {
      const cell = e.target;
      const index = cells.indexOf(cell);

      if (cell.textContent === '' && gameActive) {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin(currentPlayer)) {
          endGame(false);
        } else if (checkDraw()) {
          endGame(true);
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          turnHeading.textContent = "It's " + currentPlayer + "'s turn";
        }
      }
    }

    function checkWin(player) {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return cells[index].classList.contains(player);
        });
      });
    }

    function checkDraw() {
      return cells.every(cell => {
        return cell.textContent !== '';
      });
    }

    function endGame(draw) {
      gameActive = false;
      turnHeading.textContent = '';
//I can't figure out how to get the winner of the second game to get a banner to show up. It works for the first game, but thats it. I would have to refresh the page each time. 
      if (draw) {
        winnerAlert.textContent = "It's a draw!";
      } else {
        winnerAlert.textContent = "Player " + currentPlayer + " wins"
      } }
      winnerAlert.style.display = 'block';
    

    function restartGame() {
      currentPlayer = 'X';
      gameActive = true;

      cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
      });

      turnHeading.textContent = "It's X's turn";
      winnerAlert.style.display = 'none';
    }

    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);
