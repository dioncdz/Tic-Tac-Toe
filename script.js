
// let setBoard = (function() {
   // ELEMENTS
   const cells = document.querySelectorAll('[data-cell]');
   const restartButton = document.querySelector('.restart');
   const newGame = document.querySelector('.new-game');
   let againstComp = document.querySelector('#vs-computer');
   let winner = document.querySelector('.result')
   let currentPlayer = true;
   let isVSComputer = false;
   let isCompTurn = false;
   let isGameOver;
   
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
      } 

      isGameOver = false;
      currentPlayer = true;

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
      // let winningCombo = []
   
      if(playerTurn) {
         player = 'circle';
      } else {
         player = 'x';
      }
      
      // Returns true if a winning combo has been hit
      let isWinner = winningCombos.some(combination => {
         return combination.every(index => {
            // winningCombo = combination;
            return [...cells][index].classList.contains(player)
         })
      })
   
      // If there's a winner declare a winner
      if (isWinner) {
         // for(let i =0; i < winningCombo.length; i++) {
         //    [...cells][winningCombo[i]].style.background = 'grey'
         // }
         declareWinner(player)
      }
   
      // If board is full and game not over === DRAW
      if(
         [...cells].every(cell => {return cell.classList.length > 1}) 
         && isGameOver == false
         ) {
         declareDraw()
      }
   
   }
   
   function compTurn() {
      isCompTurn == true;
      function compPick() {
         return Math.floor(Math.random() * 9)
      }

      let compMark = compPick();

      while ([...cells][compMark].classList.length !== 1){
         compMark = compPick();
      }

      if(currentPlayer) {
         [...cells][compMark].classList.add('circle')
      } else {
         [...cells][compMark].classList.add('x')
      }

      checkWinner(currentPlayer);
      currentPlayer = !currentPlayer ;
      isCompTurn = false;
   }


   function playerMark(e) {
      if(e.target.classList.length === 1 && isCompTurn == false) {
         if(currentPlayer) {
            e.target.classList.add('circle')
         } else {
            e.target.classList.add('x')
         }
   
         checkWinner(currentPlayer);
         currentPlayer = !currentPlayer;
      }

      if(isVSComputer && isGameOver == false) {
         isCompTurn = true;
         setTimeout(compTurn, 1000)
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

