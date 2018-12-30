let startGame = function() {
  let game = new Game();

}

function Game (){
  this.height='800px';
  this.width= '600px';
  this.player1 =  new Player('Hugo');
  this.player2 = new Player('Annabelle');
  //this.card = new Card(suit, number);
  this.cards = [];
  //this.deck =[];

}

//Game.prototype.createDeck = function(){
  // to create the deck with the 52 cards
  /* var numbers = ["2","3","4","5","6","7","9","10","J","Q","K","A"];
  var suits = ["H","D","C","S"];
  var deck = [];
  var card;
  for (var i = 0;  i < numbers.length; i++){
    for(var j = 0; j < suits.length; j++){
      card = {value:numbers[i], suit:suits[j]};
      deck.push(card);
    }
  }
   console.log(deck); */
  Game.prototype.createDeck = function(){
  var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
  var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  var card;
  var deck = [];
	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < values.length; x++)
		{
		  card = {value:values[x],suit:suits[i]};
      deck.push(card);
      
		}
	}

	return deck;
}

Game.prototype.shuffleCards = function(){
  console.log('teste');
  var deck = Game.prototype.createDeck();
  for (let i=0; i < deck.length-2; i++){
    let random = Math.floor(Math.random()*(deck.length -i)) + i;
    let j = deck[i];
    deck[i] = deck[random];
    deck[random] = j;
  }
  return deck;
}


Game.prototype.dealCards = function(){
  //create a loop
  var cards =  Game.prototype.shuffleCards();
  var hand = [];
  if (cards.length > 0){
    return cards.shift();
  }else{
    console.log('no cards');
  }
}
  Game.prototype.hand = function(){
    console.log('hand');
    var hand =[];
    for (var i = 0; i < 6; i++){
      var temp = Game.prototype.dealCards();
      hand.push(temp); 
    } 
    console.log(hand);
  }
    
Game.prototype.firstDeal = function(){
  // to show the first card 
  var array = Game.prototype.shuffleCards();
  return array
}
Game.prototype.tableCards = function(){

}

Game.prototype.renderDeck = function(){
  // to send the cards to DOM
}
Game.prototype.takeCardFromStack = function (){

}


Game.prototype.matchCards = function(cardHand, cardStack){
  /*
    if the car

  */
}
Game.cardHand


Game.prototype.gameOver = function (){
  console.log('teste')

}