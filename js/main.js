let buttonHide = document.getElementById('btn-hide');
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

buttonHide.addEventListener('click', function(){
  turnPlayer();
});

// Restart Button
function restartButton(){
  console.log('button');
  window.location.reload();
  
  /*
  let gameScreen = document.getElementById('container-cards');
  let gameOverScreen = document.getElementById('gameover-screen');
  let startScreen = document.getElementById('start-screen');
  startScreen.style.display = 'block';
  gameOverScreen.style.display = 'none';
  */
}

  //popup.classList.toggle('hidden');
  //if(popup.classList.toggle === 'hidden'){
    //console.log('ok');
    //popup.style.display = 'block';  

  //}else{
    //popup.style.display = 'none';

  //OLHAR A POSSIBILIDADE DE COLOCAR OS JOGADORES EM UM ARRAY PARA COMPROVAR OS TURNOS


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

  startGame();

}

// show hide card button 
/*
function turnPlayer(){

  var cardHand = document.getElementById('cards-hand');
  var cardHandHide = document.getElementById('cards-hand-hide');
  var img = document.createElement('img');
  img.src = 'images/newcards/back.png';
  if(cardHand && cardHand.style.display ==='flex'){
    cardHand.style.display ==='none';
    cardHandHide.style.display ==='flex';
    //cardHandHide.appendChild(img);
  }else {
    cardHand.style.display = 'flex';
    cardHandHide.style.display = 'none';
  }

}
*/



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