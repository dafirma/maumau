let startGame = function() {
  let game = new Game();

}

function Game (){
  this.height='800px';
  this.width= '600px';
  this.player1 =  new Player('Hugo');
  this.player2 = new Player('Annabelle');
  this.card = new Card(suit, number);
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


Game.prototype.deal = function (){
    var suit = Math.floor();

}
Game.prototype.firstDeal = function(){
  // to show the first card 
}


Game.prototype.gameOver = function (){
  console.log('teste')

}
Game.prototype.takeCardFromStack = function (){

}


Game.prototype.matchCards = function(cardHand, cardStack){
  /*
    if the car

  */
}
Game.cardHand

