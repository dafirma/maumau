function Cards(number, suit){
  this.number = number;
  this.suit = suit;
  //this.image = image;
  this.cards = [];
  this.toString = cardtoString;
}

function cardtoString(){ 
  // not sure if is prototype or just function

  var number; 
  var suit;

  switch (this.number) {
    case "A" :
      number = "Ace";
      break;
    case "2" :
      number = "Two";
      break;
    case "3" :
      number = "Three";
      break;
    case "4" :
      number = "Four";
      break;
    case "5" :
      number = "Five";
      break;
    case "6" :
      number = "Six";
      break;
    case "7" :
      number = "Seven";
      break;
    case "8" :
      number = "Eight";
      break;
    case "9" :
      number = "Nine";
      break;
    case "10" :
      number = "Ten";
      break;
    case "J" :
      number = "Jack"
      break;
    case "Q" :
      number = "Queen"
      break;
    case "K" :
      number = "King"
      break;
    default :
      number = null;
      break;
  }

  switch (this.suit) {
    case "C" :
      suit = "Clubs";
      break;
    case "D" :
      suit = "Diamonds"
      break;
    case "H" :
      suit = "Hearts"
      break;
    case "S" :
      suit = "Spades"
      break;
  }

  if (number == null || suit == null)
    return "";

  return number + "_of_" + suit;
}
/*
  // to test 
  var card1 = new Card("3", "C");
  console.log(card1.toString());

*/
