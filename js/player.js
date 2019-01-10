function Player (name){
  this.name = name;
  this.hand= [];

  
}
Player.prototype.counterCards = function(){
  this.hand =[]; /// logic to check if the hand is empty.

}

Player.prototype.showName = function(){
  console.log(this.name);
}


