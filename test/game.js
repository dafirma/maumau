function Game (){
  this.height='800px';
  this.weight= '600px';
  this.player1 =  new Player(true, image)//call function player(construction function)
  this.player2 = new Player(false,image)
  this.card = new Card(suit, number)
}

function Cards(suit, number, image){
  this.suit = suit;
  this.number = number;
  this.image = image;
  this.cards = [{}];
}

let cards = [{
  suit: 'hearts',
  number: 2,
  //image:
},
{}];


Game.prototype.shuffleCards = function(){

}

function Player (turn,){
  this.hand= [];
  this.turn = turn;
  
}
Player.prototype.counterCards = function(){
  this.hand =[]; /// logic to check with the hand is empty.

}
