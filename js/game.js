let game;

function Game (){
  this.players = [new Player('Hugo'), new Player('Anna')];
  this.turn = 1;
  this.cards = [];
  this.table = [];
}

Game.prototype.makeDeck = function(){
  var suit = new Array("Spades", "Diamonds", "Clubs", "Hearts");
  var values = new Array("A", "8", "9", "10", "J", "Q", "K");
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
  if(number === this.table[0].number || suit === this.table[0].suit || number === 'A'){
    console.log('match con: ', number, suit, index);
    //alert('PLAYER 2, IT\'S YOUR TURN!');
    game.deleteCard(number, suit, index);
    game.popupPlayer();
    imgPlayer.forEach(elem => {
      $(elem).off('click');
    });
    game.newTurnPlayer();
  }else if(number === 'A'){
    game.gameOverGame();
    game.popupPlayer();
    game.deleteCard(number, suit, index);
    imgPlayer.forEach(elem => {
      $(elem).off('click');
    });
  }else if(number === 'K'){
    game.gameOverGame();
    game.popupPlayer();
    game.deleteCard(number, suit, index);
    imgPlayer.forEach(elem => {
      $(elem).off('click');
    });
  }else{
    console.log('no match, a comprar!!!!!');
    game.popupPlayerWrong();
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

Game.prototype.turnPlayer = function(){ 
  console.log(this.turn);
  let handPlayer2 = document.getElementById(`cards-hand-0`);
  let handPlayer1 = document.getElementById(`cards-hand-1`);
  if(this.turn === 0 && handPlayer2.style.display === 'block'){
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
    var nextCard = this.cards[0];
    game.sendCardToHand(this.cards[0],turnTemp);
    this.players[this.turn].hand.push(nextCard);
    this.cards.shift();
    console.log('teste');
    imgPlayer.forEach(elem => {
      $(elem).off('click');
    });
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

 Game.prototype.deleteCardDom = function(index, number, suit, cardToTable,times){
   console.log('index to delete:' + index); 
   var table = document.getElementById('cards-table');
   var changeAtt = table.childNodes[1];
   changeAtt.src = `images/newcards/${number}-${suit}.png`;
   changeAtt.setAttribute("data-suit", suit);
   changeAtt.setAttribute("data-number",number);
   table.appendChild(changeAtt);
   this.table.shift();
   this.table.push(cardToTable);
   console.log(times);
   if(times > 1){
    $(`#cards-hand-${this.turn}`).children()[index].remove();
    $(`#cards-hand-${this.turn}`).children()[index].remove();
   }else{
     $(`#cards-hand-${this.turn}`).children()[index].remove();

   }

}

Game.prototype.deleteCard = function(number, suit, index){
  console.log(this.turn);
  let times=0;
  if(number === this.players[this.turn].hand[index].number || suit === this.players[this.turn].hand[index].suit){
    var cardToDelete = index;
    var cardToTable = this.players[this.turn].hand[index];
    game.deleteCardDom(cardToDelete,number,suit, cardToTable);
    this.players[this.turn].hand.splice(index,1); 
    game.gameOverGame();
  }else if(number === 'A'){
    game.deleteCardDom(cardToDelete,number,suit, cardToTable);
    this.players[this.turn].hand.splice(index,1);

  }else if(number === 'K'){
    times = 2;
    game.deleteCardDom(cardToDelete,number,suit, cardToTable,times);
    this.players[this.turn].hand.splice(index,2);

  }else {
    console.log('error');
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
  game.gameOverGame();
  
}

Game.prototype.gameOverGame = function(){
  let screen = document.getElementById('gameover-screen');
  let name = document.getElementById('player-name');
  let mainScreen = document.getElementById('container-cards');
  let textNodePlayer1 = document.createTextNode(`Player 1 win!!!`);
  let textNodePlayer2 = document.createTextNode(`Player 2 win!!!`);
  if(this.players[1].hand.length === 0){
    //alert('PLAYER 1 WIN!!!');
    name.appendChild(textNodePlayer1);
    screen.style.display = 'block';
    mainScreen.style.display = 'none';
  }else if(this.players[0].hand.length === 0){
      //alert('PLAYER 2 WIN!!!')
      name.appendChild(textNodePlayer2);
      screen.style.display = 'block';
      mainScreen.style.display = 'none';
  }else if(this.cards === 0){
    if(this.players[0].hand.length < this.players[1].hand.length){
      name.appendChild(textNodePlayer2);
      screen.style.display = 'block';
      mainScreen.style.display = 'none';
    }else if(this.players[1].hand.length < this.players[0].hand.length){
      name.appendChild(textNodePlayer1);
      screen.style.display = 'block';
      mainScreen.style.display = 'none';
      }
  }
}

Game.prototype.dealToTable = function(){
  if(this.cards.length > 0){
    this.table.push(this.cards[0]);
    this.cards.shift();
  }else{
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


Game.prototype.popupPlayer = function(type){
  console.log(this.turn);
  let popupTurn = document.getElementById('popup-player');
  let popupWrong = document.getElementById('popup-player');
  popupTurn.style.display = 'block';
  let textPlace = document.getElementById('text-player');
  let number = document.getElementById('numberPlayer');
  let button = document.getElementById('btn-player');
  let el0 = document.getElementById('cards-hand-0');
  let el1 = document.getElementById('cards-hand-1');
  let ch0 = document.getElementById('cards-hide-0');
  let ch1 = document.getElementById('cards-hide-1');
  if(this.turn === 1){
    button.addEventListener('click', function(){
        popupTurn.style.display ='none';
        console.log('turno deve ser1: ' + this.turn);
        el1.style.display = 'none'; 
        ch1.style.display = 'block';
        el0.style.display = 'block';
        ch0.style.display = 'none';
        number.nodeValue = "";
        document.getElementById("numberPlayer").textContent = "1";
      }
    )
  }else if(this.turn === 0){
      button.addEventListener('click', function(){
        popupTurn.style.display ='none';
        el1.style.display = 'block'; 
        ch1.style.display = 'none';
        el0.style.display = 'none';
        ch0.style.display = 'block';
        console.log('turno deve ser0: ' + this.turn);
        document.getElementById("numberPlayer").textContent = "2";
      }
    )
  }
}

Game.prototype.popupPlayerWrong = function(){
  console.log(this.turn);
  let popupWrong = document.getElementById('popup-player-wrong');
  popupWrong.style.display = 'block';
  let textPlace = document.getElementById('text-player');
  let number = document.getElementById('numberPlayer');
  let buttonWrong = document.getElementById('btn-player-wrong');
  let el0 = document.getElementById('cards-hand-0');
  let el1 = document.getElementById('cards-hand-1');
  let ch0 = document.getElementById('cards-hide-0');
  let ch1 = document.getElementById('cards-hide-1');
  if(this.turn === 1){
    buttonWrong.addEventListener('click', function(){
        popupWrong.style.display ='none';
        console.log('turno deve ser1: ' + this.turn);
        el1.style.display = 'none'; 
        ch1.style.display = 'block';
        el0.style.display = 'block';
        ch0.style.display = 'none';
        number.nodeValue = "";
        document.getElementById("numberPlayer").textContent = "2";
      })}else if(this.turn === 0){
        buttonWrong.addEventListener('click', function(){
          popupWrong.style.display ='none';
          el1.style.display = 'block'; 
        ch1.style.display = 'none';
        el0.style.display = 'none';
        ch0.style.display = 'block';
        console.log('turno deve ser0: ' + this.turn);
        document.getElementById("numberPlayer").textContent = "1";
      }
    )
  }
}

Game.prototype.bannerPlayerClick = function(){
    var popup = document.getElementById('popup-player');
    console.log('popup');
    popup.style.display = 'none';
    $(`#text-player`).children()[0].remove();
    var text = document.getElementById('text-player');

}



