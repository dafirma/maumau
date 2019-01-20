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

Game.prototype. allCardsDeal = function(){
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
}

Game.prototype.detectCard = function(){
  console.log(this.turn);
  var dataSuit;
  var dataNumber;
  var img = document.querySelectorAll(`#cards-hand-${this.turn} img`);
  //console.log(game.turn);
  img.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      let card = e.currentTarget;
      dataSuit = card.dataset.suit;
      dataNumber = card.dataset.number;
      game.matchCardsNew(dataNumber, dataSuit, index, this.turn);
    });
  });
}

//CHECK FUNCTION MATCH CARDS NEW
Game.prototype.matchCardsNew = function(number, suit, index, turn){
  if(number === this.table[0].number || suit === this.table[0].suit){
    console.log('match');
    alert('PLAYER 2, IT\'S YOUR TURN!');
    game.deleteCard(number, suit, turn, index);
  }else{
    console.log('no match');
    console.log(number,suit);
    //alert ('WRONG CARD, TRY OTHER CARD OR BUY FROM THE PILE. THE CARD MUST BE THE SAME NUMBER OR SAME SUIT.');
    game.buyCard(turn);
  }
}

Game.prototype.buyCard = function(turn){
  var cardDealer = document.getElementById('cards-dealer');
  console.log(turn);
  console.log(this.players[0].hand);
  console.log(this.players);
  if(this.cards.length > 0){
    cardDealer.addEventListener("click", function(){
    var nextCard = game.cards[0];
    console.log(nextCard);
    this.players[turn].hand.push(nextCard);
    this.cards.shift();
    game.sendCardToHand(this.players[turn].hand[this.players[turn].hand.length-1],turn);
    //this.turn = 1;
    game.newTurnPlayer(turn);
    game.detectCard();
    alert('PLAYER 1, IT\'S YOUR TURN!');    
    }.bind(this));
  }else{
  console.log('pile empty.');
  }
}


Game.prototype.sendCardToHand = function(card, turn){
    var handCard = document.getElementById(`cards-hand-${turn}`);
    var img = document.createElement('img');
    var cardNumber = card.number;
    var cardSuit = card.suit;
    img.src = `images/newcards/${cardNumber}-${cardSuit}.png`;
    img.setAttribute("data-suit", cardSuit);
    img.setAttribute("data-number", cardNumber);
    handCard.appendChild(img);
}

 Game.prototype.deleteCardDom = function(index,number,suit,turn,cardToTable){
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
  $(`#cards-hand-${turn}`).children()[index].remove(); // attention 
}


Game.prototype.deleteCard = function(number, suit, turn, index){
  console.log(turn);
  for(var i = 0; i < this.players[turn].hand.length; i++){
    if(number === this.players[turn].hand[i].number || suit === this.players[turn].hand[i].suit){
      var cardToDelete = index;
      var cardToTable = this.players[turn].hand[i];
      game.deleteCardDom(cardToDelete,number,suit,turn,cardToTable);
      this.players[turn].hand.splice(index,1); 
      game.newTurnPlayer(turn);
      game.detectCard();
    }
  }
}
Game.prototype.newTurnPlayer = function (turn){
  switch (turn){
    case 0: 
      this.turn = 1;
      console.log('was = 0 and now is: ' + this.turn);
    break;
    case 1:
      this.turn = 0;
      console.log('was = 0 and now is: ' + this.turn);
      break;
  }
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
  game.detectCard(game.turn);
  game.gameOverGame(game.turn);
  console.log('ok startGame function');
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
  console.log('ok');
};

Game.prototype.turnPlayer = function(turn){ // alone for the pop up
  if(turn === 0){
    //let popupPlayer1 = document.getElementById('popup-player1');
    //popupPlayer1.style.display = 'block';
    //game.buttonScreen();
    //this.turn = 1;
    //game.detectCard();
  }else if(turn === 1){
    //this.turn = 0;
    //game.detectCard();
  }
}

Game.prototype.buttonScreen = function(){

}