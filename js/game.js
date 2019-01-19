let game;

function Game (){
  this.players = [new Player('Hugo'), new Player('Anna')];
  this.turn = 0;
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
  var dataSuit;
  var dataNumber;
  var img = document.querySelectorAll(`#cards-hand-${game.turn} img`);
  console.log(game.turn);
  img.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      let card = e.currentTarget;
      dataSuit = card.dataset.suit;
      dataNumber = card.dataset.number;
      game.matchCardsNew(dataNumber,dataSuit, index);
    });
  });
  // if(game.turn === 0){ // try to put the gameover function in this function.
    this.players[game.turn].hand.forEach((card, index, arrray) => {
      
    });
  //     for(var j = 0; j < this.players[game.turn].hand.length; j++){
  //       var img = document.querySelectorAll(`#cards-hand-${game.turn} img`);
  //       img[j].addEventListener("click", function(e){
  //       console.log(`click: ${j - 1}` );
  //       dataNumber = e.currentTarget.dataset.number;
  //       dataSuit = e.currentTarget.dataset.suit;
  //       game.matchCardsNew(dataNumber, dataSuit, j);
  //     });
  //   }
  // } else if(game.turn === 1){
  //     for(var j = 0; j < this.players[game.turn].hand.length; j++){
  //       var img = document.querySelectorAll(`#cards-hand-${game.turn} img`);
  //       img[j].addEventListener("click", function(e){
  //       dataNumber = e.currentTarget.dataset.number;
  //       dataSuit = e.currentTarget.dataset.suit;
  //       game.matchCardsNew(dataNumber, dataSuit, j);
  //     });
  // }
//  }
}

//CHECK FUNCTION MATCH CARDS NEW
Game.prototype.matchCardsNew = function(number,suit,index){
  if(this.turn === 0){
    if(number === this.table[0].number || suit === this.table[0].suit){
      console.log('match');
      alert('PLAYER 2, IT\'S YOUR TURN!');
      game.deleteCard(number, suit, this.turn, index);
    }else{
      console.log('no match');
      console.log(number,suit);
      alert ('WRONG CARD, TRY OTHER CARD OR BUY FROM THE PILE. THE CARD MUST BE THE SAME NUMBER OR SAME SUIT.');
      game.buyCard(this.turn);
    }
  }else if(this.turn === 1){
    if(number === this.table[0].number || suit === this.table[0].suit){
      console.log('match');
      alert('PLAYER 1, IT\'S YOUR TURN!');
      console.log(number,suit);
      game.deleteCard(number, suit, this.turn, index);
    }else{
      console.log('no match');
      console.log(number,suit);
      alert ('WRONG CARD, TRY OTHER CARD OR BUY FROM THE PILE. THE CARD MUST BE THE SAME NUMBER OR SAME SUIT.');
      game.buyCard(this.turn);
    }
  }
}

Game.prototype.buyCard = function(turn){
  var cardDealer = document.getElementById('cards-dealer');
  console.log(this.players[0].hand);
  console.log(this.players);
  if(turn === 0){
    if(this.cards.length > 0){
      cardDealer.addEventListener("click", function(){
        var nextCard = game.cards[0];
        console.log(nextCard);
        this.players[turn].hand.push(nextCard);
        this.cards.shift();
        game.sendCardToHand(this.players[turn].hand[this.players[turn].hand.length-1],turn);
        this.turn = 1;
        game.detectCard();
        alert('PLAYER 1, IT\'S YOUR TURN!');    
    }.bind(this));
  }else{
    console.log('pile empty.');
    }
  }else if(turn === 1){
      if(this.cards.length > 0){
        cardDealer.addEventListener("click", function(){
        var nextCard = game.cards[0];
        console.log(nextCard);
        this.players[turn].hand.push(nextCard);
        this.cards.shift();
        game.sendCardToHand(this.players[turn].hand[this.players[turn].hand.length-1],turn);
        this.turn = 0;
        game.detectCard();
        console.log('ok');
        alert('PLAYER 2, IT\'S YOUR TURN!');    
      }.bind(this));
    }else{
      console.log('pile empty.');
    }
  } 
}


Game.prototype.sendCardToHand = function(card, turn){
  if(turn === 0){
    var handCard = document.getElementById(`cards-hand-${turn}`);
    var img = document.createElement('img');
    var cardNumber = card.number;
    var cardSuit = card.suit;
    img.src = `images/newcards/${cardNumber}-${cardSuit}.png`;
    img.setAttribute("data-suit", cardSuit);
    img.setAttribute("data-number", cardNumber);
    handCard.appendChild(img);
  }else if(turn === 1){
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

 Game.prototype.deleteCardDom = function(index,number,suit,turn,cardToTable){
   if(turn === 0){
     var hand = document.getElementById(`cards-hand-${turn}`);
     var table = document.getElementById('cards-table');
     console.log(`image/newcards/${number}-${suit}.png`);
     var changeAtt = table.childNodes[1];
     changeAtt.src = `images/newcards/${number}-${suit}.png`;
     changeAtt.setAttribute("data-suit", suit);
     changeAtt.setAttribute("data-number",number);
     hand.removeChild(hand.childNodes[index]);
     table.appendChild(changeAtt);
     console.log(changeAtt);
     this.table.shift();
     this.table.push(cardToTable);
     console.log('arr table:' + this.table);
   }else if(turn === 1){
     var hand = document.getElementById(`cards-hand-${turn}`);
     var table = document.getElementById('cards-table');
     console.log(`image/newcards/${number}-${suit}.png`);
     var changeAtt = table.childNodes[1];
     changeAtt.src = `images/newcards/${number}-${suit}.png`;
     changeAtt.setAttribute("data-suit", suit);
     changeAtt.setAttribute("data-number",number);
     console.log(hand);
     hand.removeChild(hand.childNodes[index]);
     table.appendChild(changeAtt);
     this.table.shift();
     this.table.push(cardToTable);
    }  
}


Game.prototype.deleteCard = function(number, suit, turn, index){
  console.log(turn);
  if(turn === 0){
    for(var i = 0; i < this.players[turn].hand.length; i++){
      if(number === this.players[turn].hand[i].number && this.players[turn].hand[i].suit){
        var cardToDelete = index;
        console.log('ok');
        this.turn = 1;
        var cardToTable = this.players[turn].hand[i];
        game.deleteCardDom(cardToDelete,number,suit,turn,cardToTable,index);
        this.players[turn].hand.splice(index,1); // error is deleting the first element of array 
        game.detectCard();
      }
    }
  }else if(turn === 1){ //CHECK LATER
    for(var i = 0; i < this.players[turn].hand.length; i++){
      if(number === this.players[turn].hand[i].number && this.players[turn].hand[i].suit){
        var cardToDelete = index;
        console.log('ok');
        this.turn = 0;
        var cardToTable = this.players[turn].hand[i];
        game.deleteCardDom(cardToDelete,number,suit,turn,cardToTable,index);
        this.players[turn].hand.splice(index,1);
        game.detectCard();
      }
    }
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
  game.makeDeck(); //ok
  game.allCardsShuffle(); //ok
  //img(); //ok 
  game.dealToTable(); //ok
  game.dealToHand();
  game.backCard();
  game.imgToDom();
  game.imgToTable();
  game.detectCard();
  console.log('ok startGame function');
}

Game.prototype.gameOverGame = function(turn){
  if(turn === 0){
    if(allCardsCount === 0){
      alert('PLAYER 1 WIN!!!')
    }
  }else if(turn === 1){
    if(allCardsCount === 0){
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
      this.cards.shift(); // losing the reference in this cards
    }
  }.bind(this));
  console.log('ok');
};

Game.prototype.turnPlayer = function(turn){ // alone for the pop up
  popupPlayer1 = document.getElementById('popup-player1');
  popupPlayer2 = document.getElementById('popup-player2');
  if(turn === 0 && popupPlayer1.style.display === 'none'){
    popupPlayer1.style.display = 'block';
    game.buttonScreen(turn);
  }else if(turn === 1 && popupPlayer2 === 'none') {
    popupPlayer1.style.display = 'block';
    game.buttonScreen();
  }
   
}

Game.prototype.buttonScreen = function(){
  let popupPlayer1 = document.getElementById('popup-player-1');
  let btnPlayer1 = document.getElementById('btn-player1');
  let divPlayer1 = document.getElementById('cards-hand-1');
  let divPlayer = document.getElementById('cards-hand-1');
  if(turn === 0){
    btnPlayer1.addEventListener('click', function(){
    popupPlayer1.style.display ='none';
    divPlayer1.style.displayv ='none';
    this.turn = 1;
    });
  } else if(turn === 1){
    btnPlayer1.addEventListener('click', function(){
    popupPlayer1.style.display ='none';
    divPlayer1.style.displayv ='none';
    this.turn = 0;});
  }
}