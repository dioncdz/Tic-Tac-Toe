// ELEMENTS
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('.restart');
const newGame = document.querySelector('.new-game');
let currentPlayer = true;

const winningCombos = [
   [true, true, true, 
   false, false, false, 
   false, false, false],

   [false, false, false, 
   true, true, true, 
   false, false, false],

   [false, false, false, 
   false, false, false,
   true, true, true],

   [true, false, false, 
   true, false, false,
   true, false, false],

   [false, true, false, 
   false, true, false,
   false, true, false],

   [false, false, true, 
   false, false, true,
   false, false, true],

   [true, false, false, 
   false, true, false,
   false, false, true],

   [false, false, true, 
   false, true, false,
   true, false, false],
]

// FUNCTIONS
function init() {
   cells.forEach(el => {
      el.classList.remove('x');
      el.classList.remove('circle');
      newGame.classList.remove('show')
      // console.dir(el.classList);
   })
}

function startGame() {
   newGame.classList.add('show')
}

function arrayEquals (arr1, arr2) {
   return JSON.stringify(arr1) === JSON.stringify(arr2)
}

function checkWinner() {
   // make new arrays of X and Os
   let xArr = []
   let circleArr = []
   
   // make arrays of true/false combination
   cells.forEach(el => {
      if(currentPlayer) {
         circleArr.push(el.classList.contains('circle'))
      } else if (!currentPlayer) {
         xArr.push(el.classList.contains('x'))
      }
   })

   // match x and o arrays with winning combinations
   for (let combo of winningCombos) {
      console.log(`${arrayEquals(combo, circleArr)}`)
      if(
         arrayEquals(combo, xArr) || 
         arrayEquals(combo, circleArr)
         ) {
            // TODO: DECLARE WINNER
            
            startGame()
            return currentPlayer ? `${currentPlayer} won!` : `${currentPlayer} won!`
         }
   }


   if([...cells].every(el => el.classList.length > 1)) {
      console.log("It's a draw");
   }
   console.log(xArr, circleArr);
   // If no winner or no draw, reset array values
   xArr = []
   circleArr = []
}

function playerMark(e) {
   if(currentPlayer) {
      e.target.classList.add('circle')
   } else {
      e.target.classList.add('x')
   }

   checkWinner();
   currentPlayer = !currentPlayer;
}

// init();
startGame() 


// EVENT LISTENERS
restartButton.addEventListener('click', init)

cells.forEach(el => {
   el.addEventListener('click', playerMark, {once: true})
})
