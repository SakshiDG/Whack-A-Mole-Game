const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;


function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(500, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

let countdown; // declare this variable outside of your functions

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  // assuming you have a DOM element with the id 'timer'
  const timerDisplay = document.querySelector('#timer');
  let gameTime = 10; // game time in seconds. Changed from const to let
  console.log('Initial gameTime:', gameTime); // Added console log
  displayTimeLeft(gameTime, timerDisplay);
  countdown = setInterval(() => {
    gameTime--;
    console.log('gameTime after decrement:', gameTime); // Added console log
    if(gameTime < 0){
      console.log('gameTime is less than 0, clearing interval.'); // Added console log
      clearInterval(countdown);
      timeUp = true;
      return;
    }
    displayTimeLeft(gameTime, timerDisplay);
  }, 1000)
}

function displayTimeLeft(time, display) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  console.log('Time left:', `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`); // Added console log
  display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function keyDown(e) { 
  startGame();
}


function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));