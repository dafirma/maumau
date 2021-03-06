# Project's name
MAU MAU - Card game

## Description
Brief description of the project
* Mau Mau is a card game that is played with at least 2 players.
* The players starts with (7 or 5) random cards from (2-10 or 7-10), J,Q,K,A(hearts,clubs,diamons,spades)in total 32 or 52 cards.
* The desk show one card, then every turn one player should play one card that match with the value or suit that is on the table.
* Special cards (2,7,8.9.A,J,Q)
* * A(you can change the suit)
* * 8(force the other player skip the turn once)
* * 9(force the other player to take 2 extras cards from the stack)
* * 10(force the other player to take 3 extras cards from the stack)
* * J(suit the hand between the players)

## MVP (DOM - CANVAS)
MVP definition, deliverables.
based in DOM
* creation of table, deck and deal cards for 2 players.
* deck and deal cards for 2 players.
* splash screen 
* button start
* button cover cards(player 1 / player 2)
* game over screen
* win screen


## Backlog
* create logic to player against the machine
* chain and logical condiction of cards (for player and computer)


## Data structure
Classes and methods definition.
- Deck - constructor
- Generator deck (cards, player, table)
- Card(value, suit)
- Shuffle cards   (fisher yates shuffle method)
- Deal cards 
- Turn card from the stack ( check with player can play)
- Show and Hide Cards (function to show and hide cards)
- call game screen
- call game over screen
- 



## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
    * Presentation of Game, with the rules and start button
- gameScreen
    * Screen with cards player 1 and player 2.
    * Button Show/Hide Cards
- gameoverScreen
    * Screen with game over info and button to restart
- winScreen
      Screen with Win info and button to restart

## Task
Task definition in order of priority
- Welcome Page(logo,start button) - SplashScreen
- creation of deck - gameScreen
- deal cards for 2 player
- random deal of cards
- button to cover or show the cards of player 1 or player 2
- control the turn of each player
- control the the amount of card each player should take
- GameoverScreen, WinScreen
- apply rules for special cards  


## Links


### Trello
[Link url](https://trello.com/invite/b/Ip0hANyH/b32e41e9c5a8f688dd50765e7d30353a/mau-mau-project)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/dafirma/maumau)
[Link Deploy](https://dafirma.github.io/maumau/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://slides.com/dafirma/mau-mau-card-game)