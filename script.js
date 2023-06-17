'use strict';

//We start with DOM Manipulation
//The scores of player 0 and 1 are set to 0 from 47 and 23 respectively
const score0El = document.querySelector('#score--0'); //Here, # is used as it is an Id tag in HTML
const score1El = document.getElementById('score--1'); //We can also select element by Id instead of Query Selector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');

//Buttons
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

//Declaring the variable
let currentScore, scores, activePlayer, playing;

const init = function () {
  //We now manipulate the elements by setting values from its initial value
  score0El.textContent = 0; //We are specifying numbers and not strings, but JS automatically converts to strings to display them in web page
  score1El.textContent = 0;
  currentScore = 0;
  //Variable to keep a track of the current score
  //Variable to keep a track of the active player
  activePlayer = 0;
  //An Array to store the scores of the players
  scores = [0, 0];
  //Playing state of the game which we can use for disabling the Roll and Edit buttons, once the game is finished
  playing = true;
  //Hide the dice using the hidden class defined in css
  diceEl.classList.add('hidden');
};

init();

//Switch Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //Switch to the next player using ternary operator
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Set the Current Score back to zero
  currentScore = 0;
  //We will use toggle to change the css styling for the active player.
  //In toggle, it adds the class if its not there, and removes the class, if its there
  //Toggling both of the elements will make sure, its present in only of the element
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//ROLL BUTTON - Rolling Dice Functionality
buttonRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display Dice
    diceEl.classList.remove('hidden');
    //Based on the dice number, we will display the dice image which we can do by manipulating the source image(src) in html using JS
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1 ? switch to next player : continue with current player and add the score
    if (dice !== 1) {
      //Add dice to the current player's score
      //We need to define a variable to store the score, which needs to be defined outside the function, as if we keep in here, it will get reset every time we click the function
      currentScore += dice;
      //Display the current score for the active player, which we can do by manipulating the current score of the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

//HOLD BUTTON - Hold the score of the current player and display in global score
buttonHold.addEventListener('click', function () {
  if (playing) {
    //1. Add Current Score to the score of the active player's score
    //Here, based on active player value, the score of the active player respectively is stored in the scores array position
    scores[activePlayer] += currentScore; //For player 1, the scores stored will be scores[1] = scores[1]+currentScore;
    //Now, the score of the respective active player needs to be displayed as well.
    //Here, we can assign the value based on the score tag of the element
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >=100 ? Finish the Game : Switch to the next player
    if (scores[activePlayer] >= 100) {
      //Once we have reached the score, we can finish playing the game
      playing = false;
      //We also need to hide the dice, as its not needed any more
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //We also need to remove the active player class, or else above winning effect will not work
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Let's start with switching the player
      switchPlayer();
    }
  }
});

//NEW GAME BUTTON - It resets the game
buttonNew.addEventListener('click', function () {
  //1. Set the scores to zero
  score0El.textContent = 0; //We are specifying numbers and not strings, but JS automatically converts to strings to display them in web page
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //2. Make player 1 the default player and remove the winning background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  //3. Set the current scores to zero and playing mode ON
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  init();
});
