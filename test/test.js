let button1 = document.getElementById('btn-hide');
let start = document.getElementById('btn-start');
let gameOver = document.getElementById('btn-gameover');
let restart = document.getElementById('btn-restart');

restart.addEventListener('click', function(){
  restartButton();
});

gameOver.addEventListener('click', function(){
  gameOverButton();
});

start.addEventListener('click', function(){
  startButton();
});

button1.addEventListener('click', function(){
  showHide();
});

// Restart Button
function restartButton(){
  let gameScreen = document.getElementById('container-cards');
  let gameOverScreen = document.getElementById('gameover-screen');
  let startScreen = document.getElementById('start-screen');
  startScreen.style.display = 'block';
  gameOverScreen.style.display = 'none';
  
}

//Game Over Button
function gameOverButton(){
  let gameScreen = document.getElementById('container-cards');
  let gameOverScreen = document.getElementById('gameover-screen');
  gameScreen.style.display ='none';
  gameOverScreen.style.display = 'block';
}


// start button game
function startButton(){
  let startScreen = document.getElementById('start-screen');
  let gameScreen = document.getElementById('container-cards');
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';

}

// show hide card button 

function showHide() {
  var el = document.getElementById('cards-hand');
  var elHide = document.getElementById('cards-hand-hide');
  if( el && el.style.display === 'flex'){    
      el.style.display = 'none';
      elHide.style.display = 'flex';
  }
  else {
      el.style.display = 'flex';
      elHide.style.display = 'none';
  }
}

/*
  game.onGameOver = () => {
    let gameOver = document.getElementById('gameover');
    canvas.style = 'display: none';
    gameOver.style = 'display: block';
  }

*/

/*
function showHide(id) {
    var el = document.getElementById(id);
    if( el && el.style.display == 'block')    
        el.style.display = 'none';
    else 
        el.style.display = 'block';
}
*/