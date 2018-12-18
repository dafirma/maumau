let button1 = document.getElementById('btn-hide');
/*
function hide(){
  let cardsHand = document.getElementsByClassName('cards-hand');
  let cardsHandHide = document.getElementsByClassName('cards-hand-hide');
  cardsHand.style = 'display; none';
  cardsHandHide.style = 'display: block';
} 
*/
button1.addEventListener('click', function(){
  showHide();
});

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