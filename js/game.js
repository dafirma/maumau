let game;

function Game (){
  //this.player1 = new Player('Hugo');
  this.players = [new Player('Hugo'), new Player('Anna')];
  //this.player1 = new Player(test);
  //this.player2 = new Player('test2');
  this.turn = 0;
  this.cards = []; //ok
  this.table = [];
}


// HOW TO CREATE A TURN FOR THE PLAYER 2 ???
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

function allCardsDeal(){
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
      var parent = document.getElementById(`cards-hand-${i}`);// $ to change between divs card-hand and card-hand2
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
  var dataSuit;
  var dataNumber;
  for(var i = 0; i <= 1; i++){
    for(var j = 0; j < this.players[i].hand.length; j++){
      var img = document.querySelectorAll(`#cards-hand-${i} img`);
      img[j].addEventListener("click", function(e){
      //console.log(e.currentTarget.dataset.number);
      dataNumber = e.currentTarget.dataset.number;
      dataSuit = e.currentTarget.dataset.suit;
      game.matchCardsNew(dataNumber,dataSuit);
    });
  }
}
}
//CHECK FUNCTION MATCH CARDS NEW
Game.prototype.matchCardsNew = function(number,suit){
  //console.log(this.table);
  console.log(this.turn);
  console.log(number,suit);
  if(this.turn === 0){
    if(number === this.table[this.table.length-1].number || suit === this.table[this.table.length-1].suit){
      console.log('match');
      console.log(number,suit);
      //game.sendCardToTable(number,suit);
      game.deleteCard(number,suit, this.turn);
      game.detectCard();
      // function to check how many card and if who has less card can win
      //turnPlayer();
      alert('PLAYER 2, IT\'S YOUR TURN!');
    }else{
      console.log('no match');
      console.log(number,suit);
      alert ('WRONG CARD, TRY OTHER CARD OR BUY FROM THE PILE. THE CARD MUST BE THE SAME NUMBER OR SAME SUIT.');
      game.buyCard(this.turn);
      game.detectCard();
  }
}
}

Game.prototype.buyCard = function(turn){
  var cardDealer = document.getElementById('cards-dealer');
  console.log(this.players[0].hand);
  console.log(this.players);
  if (turn === 0){
    if(this.cards.length > 0){
      cardDealer.addEventListener("click", function(){
      var nextCard = game.cards[0];
      console.log(nextCard);
      this.players[turn].hand.push(nextCard);
      this.cards.shift();
      game.sendCardToHand(this.players[turn].hand[this.players[turn].hand.length-1],turn);
      game.detectCard();    
    }.bind(this));
  }else {
    console.log('pile empty.');
    }
  }else if(turn === 0){
    if (turn === 0){
      if(this.cards.length > 0){
        cardDealer.addEventListener("click", function(){
        var nextCard = game.cards[0];
        console.log(nextCard);
        this.players[turn].hand.push(nextCard);
        this.cards.shift();
        game.sendCardToHand(this.players[turn].hand[this.players[turn].hand.length-1],turn);
        game.detectCard();    
      }.bind(this));
    } else {
        console.log('pile empty.');
      }
    } 
  }
}

Game.prototype.sendCardToHand = function(card, turn){
  if (turn === 0){
    var handCard = document.getElementById(`cards-hand-${turn}`);
    var img = document.createElement('img');
    var cardNumber = card.number;
    var cardSuit = card.suit;
    img.src = `images/newcards/${cardNumber}-${cardSuit}.png`;
    img.setAttribute("data-suit", cardSuit);
    img.setAttribute("data-number", cardNumber);
    handCard.appendChild(img);
  }
}

 Game.prototype.deleteCardDom = function(index,number,suit,turn){
  if (turn === 0){
    var i = index;
    var hand = document.getElementById(`cards-hand-${turn}`);
    var table = document.getElementById('cards-table');
    console.log(`image/newcards/${number}-${suit}.png`);
    var changeAtt = table.childNodes[1];
    changeAtt.src = `images/newcards/${number}-${suit}.png`;
    changeAtt.setAttribute("data-suit", suit);
    changeAtt.setAttribute("data-number",number);
    hand.removeChild(hand.childNodes[index+1]);
    table.appendChild(changeAtt);
  }
}
Game.prototype.deleteCard = function(number,suit,turn){
  console.log(turn);
  if(turn === 0){
    for(var i = 0; i < this.players[turn].hand.length; i++){
      if(number === this.players[turn].hand[i].number && this.players[turn].hand[i].suit){
        var cardToDelete = i;
        console.log('ok');
        game.deleteCardDom(cardToDelete,number,suit,turn);
        this.players[turn].hand.shift(i);
      }
    }
  }else if (turn === 1){ //CHECK LATER
    for(var i = 0; i < this.players[turn].hand.length; i++){
      if(number === this.players[turn].hand[i].number && this.players[turn].hand[i].suit){
        var cardToDelete = i;
        console.log('ok');
        game.deleteCardDom(cardToDelete,number,suit,turn);
        this.players[turn].hand.shift(i);
      }
    }
  } 
}
Game.prototype.sendCardToTable = function(number,suit){
  var table = document.getElementById('cards-table');
  console.log( 'card to send to table: ' + number,suit);
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
  game.makeDeck(); //ok
  game.allCardsShuffle(); //ok
  //img(); //ok 
  game.dealToTable(); //ok
  game.dealToHand();
  game.backCard();
  game.imgToDom();
  game.imgToTable();
  game.detectCard();
  game.deleteCard();
  //turnPlayer();
  console.log('ok startGame function');
}

function gameOverGame(){
  if(allCardsCount === 0){
    var screen = getElementById('')
  }

}

/*
function shuffle(){
  //console.log(this.cards);
   this.cards.allCardsShuffle();
  console.log(this.cards);
  /*if (this.cards === 0){
    console.log('deck empty');
  }else {
    this.cards.shuffle();
   console.log(this.cards);
  }
}
*/
Game.prototype.dealToTable = function(){
  if(this.cards.length > 0){
    this.table.push(this.cards[0]);
    this.cards.shift();
    //console.log(this.cards.shift());
    //console.log('table = ' + table);
    //return table;
  } else{
    console.log('empty');
  }

}
Game.prototype.dealToHand = function(){
  this.players.forEach(function (elem){
    for(var i =0; i < 5; i++){
      elem.hand.push(this.cards[0]);
      this.cards.shift(); // losing the reference in this cards
    }
  }.bind(this));
  console.log('ok');
};

