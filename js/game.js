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

/*
function Allcards(){
 this.cards = []; //ok
 this.deck = makeDeck; //ok
 this.shuffle = allCardsShuffle; //ok
 this.deal = allCardsDeal;
 this.addCard = allCardsAdd;
 this.cardCount = allCardsCount; //ok

}*/

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
	console.log (this.cards);
}

Game.prototype.allCardsShuffle = function(){
  for (let i=0; i < this.cards.length-2; i++){
    let random = Math.floor(Math.random()*(this.cards.length -i)) + i;
    let j = this.cards[i];
    this.cards[i] = this.cards[random];
    this.cards[random] = j;
  }
  this.img();
  console.log(this.cards);
}

Game.prototype.img = function(){
  this.cards.forEach(card => {
    card.image = `images/newcards/${card.number}-${card.suit}.png`;
    //console.log(card.number);
    //card.image = `${cards.number}-${cards.suit}`.png;
  });
  console.log(this.cards);
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

/*
function allCardsAdd(){ //card
  //this.cards.push(card);
  hand.push(this.cards[0]);
  this.cards.shift();
  console.log(hand);
  //imgToDom();
}
*/

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
  console.log(this.table);
  console.log(this.table.image);
  var img = document.createElement('img');
  img.src = this.table[0].image;
  var src = document.getElementById("cards-table");
  src.appendChild(img);
}

Game.prototype.detectCard = function(){
  console.log(this.players[0].hand);
  var dataSuit;
  var dataNumber;
  for(var i = 0; i <= 1; i++){
    for(var j = 0; j < this.players[i].hand.length; j++){
      var img = document.querySelectorAll(`#cards-hand-${i} img`);
      img[j].addEventListener("click", function(e){
      //console.log(e.currentTarget.dataset.number);
      dataNumber = e.currentTarget.dataset.number;
      dataSuit = e.currentTarget.dataset.suit;
      matchCardsNew(dataNumber,dataSuit);
    });
  }
}
}
Game.prototype.matchCardsNew = function(number,suit){
  //console.log(this.table);
  console.log(number,suit);
  var tempHand = hand;
  if(number === this.table[this.table.length-1].number || suit === this.table[this.table.length-1].suit){
    console.log('match');
    console.log(number,suit);
    sendCardToTable(number,suit);
    deleteCard(number,suit);
    detectCard();
    // function to check how many card and if who has less card can win
    turnPlayer();
    alert('PLAYER 2, IT\'S YOUR TURN!');
  }else{
    console.log('no match');
    console.log(number,suit);
    //alert ('WRONG CARD, TRY OTHER CARD OR BUY FROM THE PILE. THE CARD MUST BE THE SAME NUMBER OR SAME SUIT.');
    buyCard();
    detectCard()
  }
}

function buyCard(){
  var cardDealer = document.getElementById('cards-dealer');
  var cardshand = document.getElementById('cards-hand');
  //var temp = this.hand;
  //this.hand.push(nextCard);
  if(this.cards.length > 0){
      cardDealer.addEventListener("click", function(){
      //hand.push(this.cards[0]);
      var nextCard = cards[0];
      hand.push(nextCard);
      cards.shift();
      console.log(cards);
      console.log(hand);
      sendCardToHand(hand[hand.length-1]);
      detectCard();    
    });
  }else {
    console.log('pile empty.');
  }
}

function sendCardToHand(card){
  var handCard = document.getElementById('cards-hand');
  var img = document.createElement('img');
  var cardNumber = card.number;
  var cardSuit = card.suit;
  img.src = `images/newcards/${cardNumber}-${cardSuit}.png`;
  img.setAttribute("data-suit", cardSuit);
  img.setAttribute("data-number", cardNumber);
  //img.setAttribute();
  //img.setAttribute();
  handCard.appendChild(img);
  //console.log(cardNumber);
  //console.log(card);
}

function deleteCardDom(index,number,suit){
  var i = index;
  var hand = document.getElementById('cards-hand');
  var table = document.getElementById('cards-table');
  console.log(`image/newcards/${number}-${suit}.png`);
  var changeAtt = table.childNodes[1];
  changeAtt.src = `images/newcards/${number}-${suit}.png`;
  changeAtt.setAttribute("data-suit", suit);
  changeAtt.setAttribute("data-number",number);
  hand.removeChild(hand.childNodes[index+1]);
  table.appendChild(changeAtt);
  buyCard();


}
function deleteCard(number,suit){
  this.hand.forEach(function(el, i, array){
    if(number === el.number && suit === el.suit){
      var cardToDelete = i;
      //console.log(cardToDelete);
      deleteCardDom(cardToDelete,number,suit); //send the index 
      array.shift(i);
      //console.log(i); 
      //call function to send card to table
    }
  })
}
function sendCardToTable(number,suit){
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

console.log('hola');


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
  game.matchCardsNew()
  //turnPlayer();
  console.log('ok');
}

function gameOverGame(){
  if(allCardsCount === 0){
    var screen = getElementById('')
  }

}

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
    console.log(this.cards)
    for(var i =0; i < 5; i++){
      elem.hand.push(this.cards[0]);
      this.cards.shift(); // losing the reference in this cards
    }
  }.bind(this));
  console.log('ok');
};

