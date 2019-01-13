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

function allCardsShuffle(){
  for (let i=0; i < this.cards.length-2; i++){
    let random = Math.floor(Math.random()*(this.cards.length -i)) + i;
    let j = this.cards[i];
    this.cards[i] = this.cards[random];
    this.cards[random] = j;
  }
  img();
  console.log(this.cards);
}

function img (){
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

function allCardsCount(){
  return this.cards.length;
}


function allCardsAdd(){ //card
  //this.cards.push(card);
  hand.push(this.cards[0]);
  this.cards.shift();
  console.log(hand);
  //imgToDom();
}

function imgToDom(){

  this.hand.forEach(function(card, i, array) {
    var img = document.createElement('img');
    img.src = card.image;
    img.setAttribute("data-suit", card.suit);
    img.setAttribute("data-number", card.number);
    var parent = document.getElementById('cards-hand');
    parent.appendChild(img);
  });


  /*
  for (var i = 0; i < this.hand.length; i++){
  var src = document.getElementById("cards-hand");
  src.appendChild(img); //big to small
  }*/
}


function imgToTable(){
  console.log(this.table);
  console.log(this.table.image);
  var img = document.createElement('img');
  img.src = this.table[0].image;
  var src = document.getElementById("cards-table");
  src.appendChild(img);

}


function detectCard(){
  var img = document.querySelectorAll("#cards-hand img");
  console.log(img);
  console.log(img[0]);
  var dataSuit;
  var dataNumber;
  var positionImg;
for(var i = 0; i < this.hand.length; i++){
    img[i].addEventListener("click", function(e){
      //console.log(e.currentTarget.dataset.number);
      dataNumber = e.currentTarget.dataset.number;
      dataSuit = e.currentTarget.dataset.suit;
      positionImg = img[0];
      //var srcImgNew = srcImg.slice(54);
      console.log(positionImg);
      matchCardsNew(dataNumber,dataSuit);
      //deleteCardDom(positionImg);

    })
    
  }
  
}
function matchCardsNew(number,suit){
  //console.log(this.table);
  console.log(number,suit);
  var tempHand = hand;
  if(number === this.table[this.table.length-1].number || suit === this.table[this.table.length-1].suit){
    console.log('match');
    deleteCard(number,suit);
    sendCardToTable(number,suit);
  }else{
    console.log('no match');
  }
}

function deleteCardDom(index){
  var i = index;
  var hand = document.getElementById('cards-hand');
  hand.removeChild(hand.childNodes[i+1]);
  //console.log(hand);

}
function deleteCard(number,suit){
  this.hand.forEach(function(el, i, array){
    if(number === el.number && suit === el.suit){
      var cardToDelete = i;
      //console.log(cardToDelete);
      deleteCardDom(cardToDelete); //send the index 
      array.shift(i);
      console.log(i); 
        //call function to send card to table
    }
  })
}
function sendCardToTable(number,suit){
  var table = document.getElementById('cards-table');
  /*
  var img = document.createElement('img');
  img.src = this.table[0].image;
  var src = document.getElementById("cards-table");
  src.appendChild(img);


  */




}

function backCard(){
  var imgBackCard = document.createElement('img');
  imgBackCard.src = `images/newcards/back.png`;
  var src = document.getElementById("cards-dealer");
  if(allCardsCount() > 0){  
    src.appendChild(imgBackCard);

  }else {
    console.log('cards');
  }
}

//////////////////////////////////////////////////
// game
var deck;
var hand = [];
var hand2 =[];
var table = [];
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
  dealToTable();
  dealToHand();
  backCard();
  imgToDom();
  imgToTable();
  //detectCard();
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
    this.table.push(this.cards[0]);
    this.cards.shift();
    //console.log(this.cards.shift());
    //console.log('table = ' + table);
    //return table;
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
  var arrHand = this.hand;
  var arrTable = this.table;
  

 //to identify the card
}
function buyCard(){
  //take card to this.card
}
function renderCards (){

}

