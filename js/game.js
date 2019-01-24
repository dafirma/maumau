let game;

function Game (){
  this.players = [new Player('Hugo'), new Player('Anna')];
  this.turn = 1;
  this.cards = []; //ok
  this.table = [];
}

Game.prototype.makeDeck = function(){
  var suit = new Array("Spades", "Diamonds", "Clubs", "Hearts");
  var values = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
  this.cards = [];
    for (var i = 0; i < suit.length; i++){
      for (var x = 0; x < values.length; x++){
        this.cards.push(new Card(values[x], suit[i]));       
      }
    }
}

Game.prototype.allCardsShuffle = function(){
  for (let i=0; i < this.cards.length-2; i++){
    let random = Math.floor(Math.random()*(this.cards.length -i)) + i;
    let j = this.cards[i];
    this.cards[i] = this.cards[random];
    this.cards[random] = j;
  }
  this.img();
}

Game.prototype.img = function(){
  this.cards.forEach(card => {
    card.image = `images/newcards/${card.number}-${card.suit}.png`;
  });
}

Game.prototype.allCardsDeal = function(){
  if (this.cards.length > 0){
    this.deal = this.cards[0];
    this.cards.shift();
    console.log(this.cards);
    //console.log(this.cards.shift());
    console.log(this.deal);
  }else{
    console.log('empty');
  }
}

Game.prototype.allCardsCount = function(){
  return this.cards.length;
}

Game.prototype.imgToDom = function(){
  for(var i = 0; i <= 1; i++){
    for(var j = 0; j < this.players[i].hand.length; j++){
      var img = document.createElement('img');
      img.src = this.players[i].hand[j].image;
      img.setAttribute("data-suit", this.players[i].hand[j].suit);
      img.setAttribute("data-number", this.players[i].hand[j].number);
      var parent = document.getElementById(`cards-hand-${i}`);
      parent.appendChild(img);
    }
  }
}
  
Game.prototype.imgToTable = function(){
  var img = document.createElement('img');
  img.src = this.table[0].image;
  var src = document.getElementById("cards-table");
  src.appendChild(img);
  game.detectCard();
}

Game.prototype.detectCard = function() {
  if (this.turn === 1) {
    console.log('entra en el detect 111111');
    let imgPlayer1 = document.querySelectorAll(`#cards-hand-${this.turn} img`);

    imgPlayer1.forEach((elem, index, array) => {
      $(elem).click(e => {
        let card = e.currentTarget;
        let dataSuit = card.dataset.suit;
        let dataNumber = card.dataset.number;

        game.matchCardsNew(dataNumber, dataSuit, index, imgPlayer1);
      });
    });
  } else {
    console.log('entra en el detect 222222222');
    let imgPlayer2 = document.querySelectorAll(`#cards-hand-${this.turn} img`);
    
    imgPlayer2.forEach((elem, index, array) => {
      $(elem).click(e => {
        let card = e.currentTarget;
        let dataSuit = card.dataset.suit;
        let dataNumber = card.dataset.number;
        
        game.matchCardsNew(dataNumber, dataSuit, index, imgPlayer2);
      });
    });
  }
}


//CHECK FUNCTION MATCH CARDS NEW
Game.prototype.matchCardsNew = function(number, suit, index, imgPlayer){
  console.log(imgPlayer);
  if(number === this.table[0].number || suit === this.table[0].suit){
    console.log('match con: ', number, suit, index);
    
    //game.popupPlayer(turn);
    //alert('PLAYER 2, IT\'S YOUR TURN!');
    game.deleteCard(number, suit, index);
    imgPlayer.forEach(elem => {
      $(elem).off('click');
    });
    //game.turnPlayer();
    game.newTurnPlayer();
  }else{
    console.log('no match, a comprar!!!!!');
    //console.log(number,suit);
    //alert ('WRONG CARD, TRY OTHER CARD OR BUY FROM THE PILE. THE CARD MUST BE THE SAME NUMBER OR SAME SUIT.');
    game.buyCard();
    
  }
}

Game.prototype.newTurnPlayer = function (){
  console.log('turno antes de cambiarlo: ', this.turn);
  if(this.turn === 1){
    this.turn = 0;
  } else {
    this.turn = 1;
  }
  game.detectCard();
} 

Game.prototype.turnPlayer = function(){ // alone for the pop up
  console.log(this.turn);
  let handPlayer2 = document.getElementById(`cards-hand-0`);
  let handPlayer1 = document.getElementById(`cards-hand-1`);
  if(this.turn === 0 && handPlayer2.style.display === 'block'){
    //let popupPlayer1 = document.getElementById('popup-player1');
    //popupPlayer1.style.display = 'block';
    //game.buttonScreen();
    handPlayer2.style.display = 'none';
    this.turn = 1;
  }
}
Game.prototype.buyCard = function(){
  let cardDealer = document.getElementById('cards-dealer');
  let imgPlayer = document.querySelectorAll(`#cards-hand-${this.turn} img`);
  console.log(this.turn);
  let turnTemp = this.turn;
  if (game.allCardsCount != 0){
    cardDealer.addEventListener('click', function(){
      var nextCard = this.cards[0];
      game.sendCardToHand(this.cards[0],turnTemp);
      this.players[this.turn].hand.push(nextCard);
      this.cards.shift();
      console.log('teste');
      //alert('PLAYER 1, IT\'S YOUR TURN!');    
    }.bind(this));
    imgPlayer.forEach(elem => {
      $(elem).off('click');
    });
    $(cardDealer).off('click');
      game.newTurnPlayer();
  }else{
    console.log('pile empty.');
  }
  $(cardDealer).off('click');
  game.newTurnPlayer();
}


Game.prototype.sendCardToHand = function(card, turnTemp){
    var handCard = document.getElementById(`cards-hand-${turnTemp}`);
    var img = document.createElement('img');
    var cardNumber = card.number;
    var cardSuit = card.suit;
    img.src = `images/newcards/${cardNumber}-${cardSuit}.png`;
    img.setAttribute("data-suit", cardSuit);
    img.setAttribute("data-number", cardNumber);
    handCard.appendChild(img);
}

 Game.prototype.deleteCardDom = function(index, number, suit, cardToTable){
   console.log('index to delete:' + index); 
   var table = document.getElementById('cards-table');
   //var hand = document.getElementById(`cards-hand-${turn}`);
   var changeAtt = table.childNodes[1];
   changeAtt.src = `images/newcards/${number}-${suit}.png`;
   changeAtt.setAttribute("data-suit", suit);
   changeAtt.setAttribute("data-number",number);
   table.appendChild(changeAtt);
   this.table.shift();
   this.table.push(cardToTable);
  $(`#cards-hand-${this.turn}`).children()[index].remove(); // attention 
}


Game.prototype.deleteCard = function(number, suit, index){
  console.log(this.turn);
  if(number === this.players[this.turn].hand[index].number || suit === this.players[this.turn].hand[index].suit){
    var cardToDelete = index;
    var cardToTable = this.players[this.turn].hand[index];
    game.deleteCardDom(cardToDelete,number,suit, cardToTable);
    this.players[this.turn].hand.splice(index,1); 
    //game.newTurnPlayer();
    // game.detectCard();
  }else {
    console.log('error');
  }



  /*for(var i = 0; i < this.players[turn].hand.length; i++){
    if(number === this.players[turn].hand[i].number || suit === this.players[turn].hand[i].suit){
      var cardToDelete = index;
      var cardToTable = this.players[turn].hand[i];
      game.deleteCardDom(cardToDelete,number,suit,turn,cardToTable);
      this.players[turn].hand.splice(index,1); 
      game.newTurnPlayer(turn);
      game.detectCard();
    }
  }*/
}


Game.prototype.sendCardToTable = function(number,suit){
  var table = document.getElementById('cards-table');
  console.log(`image/newcards/${number}-${suit}.png`);
  var changeAtt = table.childNodes[1];
  changeAtt.src = `images/newcards/${number}-${suit}.png`;
  changeAtt.setAttribute("data-suit", suit);
  changeAtt.setAttribute("data-number",number);
  table.appendChild(changeAtt);
}
/*

Game.prototype.showHide0 = function(){
  let el0 = document.getElementById('cards-hand-0');
  let ch0 = document.getElementById('cards-hide-0');
  let button0 = document.getElementById('btn-hide0');
  console.log(this.turn);
  console.log(el0);
  button0.addEventListener('click', function(){
    if(ch0.style.display ==='block'){
      ch0.style.display = 'none';
      el0.style.display = 'none';
      console.log('test ok')
    }else if(ch0.style.display ==='none'){
      ch0.style.display = 'block';
      el0.style.direction = 'none';
      console.log('test error');s
    }

  })

  }
  */
  /*
  if(ch0.style.display ==='block'){
    console.log(el1);
    ch0.style.display = 'none';
    el0.style.display = 'none';
  }else if(ch0.style.display ==='none'){
    ch0.style.display = 'block';
    el0.style.direction = 'none';
  }/*else if(this.turn === 0 && el0.style.display === 'none'){
    el0.style.display === 'block';
  }else if(this.turn === 0 && el0.style.display === 'block'){
    el0.style.display === 'none';
  }

}.bind(this);*/
Game.prototype.backCard = function(){
  var imgBackCard = document.createElement('img');
  imgBackCard.src = `images/newcards/back.png`;
  var src = document.getElementById("cards-dealer");
  if(game.allCardsCount() > 0){
    src.appendChild(imgBackCard);
   }else {
    console.log('cards');
  }
}

function startGame(){
  game = new Game();
  game.makeDeck();
  game.allCardsShuffle();
  game.dealToTable();
  game.dealToHand();
  game.backCard();
  game.imgToDom();
  game.imgToTable();
  game.gameOverGame(game.turn);
}

Game.prototype.gameOverGame = function(turn){
  if(turn === 0){
    if(game.allCardsCount() === 0){
      alert('PLAYER 1 WIN!!!')
    }
  }else if(turn === 1){
    if(game.allCardsCount() === 0){
      alert('PLAYER 2 WIN!!!')
    }
  }
}

Game.prototype.dealToTable = function(){
  if(this.cards.length > 0){
    this.table.push(this.cards[0]);
    this.cards.shift();
  } else{
    console.log('empty');
  }

}
Game.prototype.dealToHand = function(){
  this.players.forEach(function (elem){
    for(var i =0; i < 5; i++){
      elem.hand.push(this.cards[0]);
      this.cards.shift(); 
    }
  }.bind(this));
};


Game.prototype.popupPlayer = function(turn){
  console.log('tesr');
  var popup = document.getElementById('popup-player');
  var textPlace = document.getElementById('text-player');
  var textP = document.createElement('p');
  //textP.textContent = (`Player ${turn}, it's your turn!`);
  //var text = document.createTextNode(`Player ${turn}, it's your turn!`);
  textPlace.appendChild(textP);
  popup.style.display = 'block';
}

  Game.prototype.bannerPlayerClick = function(){
    var popup = document.getElementById('popup-player');
    console.log('popup');
    popup.style.display = 'none';
    $(`#text-player`).children()[0].remove();
    var text = document.getElementById('text-player');

  }
  /*
  if(popup.style.display === 'none'){
    var text = document.createTextNode(`Player ${turn}, it's your turn!`);
    popup.style.display ='block';
  }else if(popup.style.display === 'block'){
      popup.style.display ='none';
  }*/


Game.prototype.buttonScreen = function(){

}
//let buttonHide = document.getElementById('btn-hide');
//buttonHide.addEventListener('click', function(){
//  Game.prototype.showHide();
//});
/*
  //var elHide = document.getElementById('cards-hand-hide');
  if( this.turn === 0 && el.style.display === 'none'){    
      el.style.display = 'flex';
      //elHide.style.display = 'flex';
  }
  else if(this.turn === 1 && el.style.display ==='flex'){
      el.style.display = 'none';
      //elHide.style.display = 'none';
  }*/



