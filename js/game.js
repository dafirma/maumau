// origin hand cards
let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');
let card4 = document.getElementById('card4');
let card5 = document.getElementById('card5');
// button hide card
let hideCards = document.getElementById('btn-hide');
hideCards.addEventListener('click',function(){
  console.log('test');
})
let divHandCards = document.getElementById('container-cards');
let counter = divHandCards.getElementsByTagName('div');
function hide (){
  let backCard = document.getElementById('dealer');
  let cloneBackCard = backCard.cloneNode(true);
  
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



