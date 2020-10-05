
// let setBoard = (function() {
   // ELEMENTS
   const cells = document.querySelectorAll('[data-cell]');
   const restartButton = document.querySelector('.restart');
   const newGame = document.querySelector('.new-game');
   let againstComp = document.querySelector('#vs-computer');
   let winner = document.querySelector('.result')
   let currentPlayer = true;
   let isVSComputer;
   let isGameOver = false;
   
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

      if(againstComp.checked) {
         isVSComputer = true;
      } else {
         isVSComputer = false;
      }

      isGameOver = false;
      currentPlayer = true;

      console.log(isVSComputer);
   }
   
   function startGame() {
      newGame.classList.add('show')
   }
   
   function declareWinner(player) {
      winner.textContent = player.toUpperCase() + ' is the winner!';
      isGameOver = true;
      startGame()
   }
   
   function declareDraw() {
      winner.textContent = "It's a draw!"
      isGameOver = true;
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

         if([...cells].some(cell => {return cell.classList.length < 2}) && isGameOver == false) {

            if(isVSComputer) {
   
               function compPick() {
                  return Math.floor(Math.random() * 9)
               }
   
               let compMark = compPick();
   
               while ([...cells][compMark].classList.length !== 1){
                  compMark = compPick();
               }
               // if([...cells].every(cell => {return cell.classList.length < 2})) {
               // }
   
               if(currentPlayer) {
                  [...cells][compMark].classList.add('circle')
               } else {
                  [...cells][compMark].classList.add('x')
               }
   
               // remove comment once done wth func
               checkWinner(currentPlayer);
               currentPlayer = !currentPlayer ;
            }
         }
      }
   
   }

   // EVENT LISTENERS
   restartButton.addEventListener('click', init)
   
   cells.forEach(el => {
      el.addEventListener('click', playerMark)
   })

   // return {startGame};
// })()

startGame()
// setBoard.startGame()

