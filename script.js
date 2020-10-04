
let setBoard = (function() {
   // ELEMENTS
   const cells = document.querySelectorAll('[data-cell]');
   const restartButton = document.querySelector('.restart');
   const newGame = document.querySelector('.new-game');
   let winner = document.querySelector('.result')
   let currentPlayer = true;
   
   const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ]
   
   // FUNCTIONS
   function init() {
      cells.forEach(el => {
         el.classList.remove('x');
         el.classList.remove('circle');
         newGame.classList.remove('show')
      })
   }
   
   function startGame() {
      newGame.classList.add('show')
      // TODO: create a computer opponent
   }
   
   function declareWinner(player) {
      winner.textContent = player.toUpperCase() + ' is the winner!'
      startGame()
   }
   
   function declareDraw() {
      winner.textContent = "It's a draw!"
      startGame()
   }
   
   function checkWinner(playerTurn) {
      let player;
   
      if(playerTurn) {
         player = 'circle';
      } else {
         player = 'x';
      }
   
      let isWinner = winningCombos.some(combination => {
         return combination.every(index => {
            return [...cells][index].classList.contains(player)
         })
      })
   
      // If there's a winner declare a winner
      if (isWinner) {
         declareWinner(player)
      }
   
      // If board is full and no winner === DRAW
      if([...cells].every(cell => {return cell.classList.length > 1})) {
         declareDraw()
      }
   
   }
   
   function playerMark(e) {
   
      if(e.target.classList.length === 1) {
         if(currentPlayer) {
            e.target.classList.add('circle')
         } else {
            e.target.classList.add('x')
         }
   
         checkWinner(currentPlayer);
         currentPlayer = !currentPlayer;
      }
   
   }

   // EVENT LISTENERS
   restartButton.addEventListener('click', init)
   
   cells.forEach(el => {
      el.addEventListener('click', playerMark)
   })

   return {startGame};
})()

setBoard.startGame()

