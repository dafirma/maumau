function Game (){
  this.height='800px';
  this.weight= '600px';
  this.player1 =  new Player(true, image)//call function player(construction function)
  this.player2 = new Player(false,image)
  this.card = new Card(suit, number)
}


Game.prototype.shuffleCards = function(){

}

Game.prototype.deal = function (){
  //to deal the cards after shuffle
}

