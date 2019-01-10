function Game (){
  this.player1 = new Player('Hugo');

}
function Allcards(){
 this.cards = []; //ok
 this.deck = makeDeck; //ok
 this.shuffle = allCardsShuffle; //ok
 this.deal = allCardsDeal;
 this.addCard = allCardsAdd;
 this.cardCount = allCardsCount;

}
function makeDeck(){
  var suit = new Array("Spades", "Diamonds", "Clubs", "Hearts");
  var values = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
  this.cards = [];
    for (var i = 0; i < suit.length; i++){
      for (var x = 0; x < values.length; x++){
        //this.cards = {value:values[x],suit:suits[i]};
        //deck.push(this.cards);
        this.cards.push(new Card(values[x], suit[i]));       
      }
    }	
  //console.log(deck)
	console.log (this.cards);
}

function img (){
  this.cards.forEach(card => {
    card.image = `images/newcards/${card.number}-${card.suit}.png`;
    //console.log(card.number);
    //card.image = `${cards.number}-${cards.suit}`.png;
  });
  console.log(this.cards);
}

function imgToDom(){
  for(var i = 0; i < this.hand.length; i++){
  var img = document.createElement('img');
  img.src = this.hand[i].image;
  var src = document.getElementById("cards-hand");
  src.appendChild(img);
  console.log(img.src);
  }
}

function detectCard(){
  //event listner to check when click in the card
  console.log('hola');
  let divs = document.getElementsByTagName('div');
  for (var i = 0; i < this.hand.length; i++){
    divs[i].addEventListener('click', function(){
      console.log('ok');
    })

  }
}
function allCardsShuffle(){
  for (let i=0; i < this.cards.length-2; i++){
    let random = Math.floor(Math.random()*(this.cards.length -i)) + i;
    let j = this.cards[i];
    this.cards[i] = this.cards[random];
    this.cards[random] = j;
  }
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

function allCardsAdd(card){
  this.cards.push(card);

}
function allCardsCount(){
  return this.cards.length;
}
//////////////////////////////////////////////////
// game
var deck;
var hand = [];
var table;
function initGame(){
  deck = null;
  //deck = new Allcards();
  //hand = new Allcards();
  //table = new Allcards();
  hand2 = new Allcards();

  //deck.deck(); //to create the deck
  console.log('hola');
 console.log(deck);

}
function startGame(){
  makeDeck();
  allCardsShuffle();
  img();
  dealToTable()
  dealToHand();
  console.log('ok');
}

function shuffle(){
  //console.log(this.cards);
   this.cards.allCardsShuffle();
  console.log(this.cards);
  /*if (this.cards === 0){
    console.log('deck empty');
  }else {
    this.cards.shuffle();
   console.log(this.cards);
  }*/
}

function dealToTable(){
  if (this.cards.length > 0){
    table = this.cards[0];
    this.cards.shift();
    console.log(this.cards);
    //console.log(this.cards.shift());
    //console.log('table = ' + table);
    return table;
  }else{
    console.log('empty');
  }

}

function dealToHand(){
  for (var i = hand.length; i < 5; i++){
      hand.push(this.cards[0]);
      this.cards.shift();
    }
  console.log(hand); // to check ok
}

function canPlay(){
    // how to access the card suit/number??? 
  let tableCard = this.table;
  let handCard = this.hand;
  let tableValue = tableCard.number;
  let tableSuit = tableCard.suit;
  //console.log(tableCard); ok
  //console.log(tableValue); ok
  //console.log(tableSuit); ok
  // console.log(handCard); ok
 if (handCard.some(item => item.number === tableValue)){
    console.log('yes, you can play. value ok');
    matchCards();
  } else if (handCard.some(item => item.suit === tableSuit)){
    console.log('yes, you can play. suit ok');
    matchCards();
  } else{
    console.log('no you cannot play');

  } 
}
function matchCards(){
 //to identify the card
}
function buyCard(){
  //take card to this.card
}
function renderCards (){

}
/*
function gameOver(){

}
*/

/*// origin hand cards
let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');
let card4 = document.getElementById('card4');
let card5 = document.getElementById('card5');
// button hide card
let hideCards = document.getElementById('btn-hide');
hideCards.addEventListener('click',function(){ 
  hide();
})
// let divHandCards = document.getElementById('container-cards');
// let counter = divHandCards.getElementsByTagName('div');
function hide (){
  let backCard = document.getElementById('dealer');
  let cloneBackCard = backCard.cloneNode(true);
  let divHandCards = document.getElementById('container-cards');
  let counter = divHandCards.getElementsByTagName('div');
  for (let i = 0; i < counter.length; i++){
    counter[i].parentNode.replaceChild(cloneBackCard,counter[i]);

  }
  
}

let containerHand = document.getElementById('container-cards');
// destination cards
// maybe to get all the cards will be better by querySeletorAll(array)
//let stack = document.getElementById('stack');
let newStack = document.createElement('div');
//let cloneCard= card2.cloneNode(true);
//window.onload = function(){
//  sendCardToStack();
//}

function sendCardToStack(card){
  let stackPosition = document.getElementsByTagName('div')[3];
  let cloneCard = card.cloneNode(true);
  stackPosition.parentNode.replaceChild(cloneCard, stackPosition);
}
card1.addEventListener('click', function (){
  sendCardToStack(card1)}
  );
card2.addEventListener('click', function (){
    sendCardToStack(card2)}
  );
card3.addEventListener('click', function (){
  sendCardToStack(card3)}
  );  
card4.addEventListener('click', function (){
  sendCardToStack(card4)}
  );
card5.addEventListener('click', function (){
  sendCardToStack(card5)}
  );

*/

