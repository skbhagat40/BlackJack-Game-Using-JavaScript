// BlackJack
let suits = ["Hearts","Clubs","Diamonds","Spades"];
let values = ["Ace","King","Queen","Jack","Ten","Nine",
               "Eight","Seven","Six","Five","Four","Three","Two"];
               
var textArea = document.getElementById('text-area');
newGame = document.getElementById('new-game-button');
hit = document.getElementById('hit-button');
stay = document.getElementById('stay-button');

hit.style.display = 'none';
stay.style.display =  'none';

// game variables;
var gameStarted = false,
 
  playerWon = false,
  gameTie = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

newGame.addEventListener('click',function(){
  gameOver = false,
  textArea.innerText = "game started!";
  newGame.style.display = 'none';
  hit.style.display = 'inline';
  stay.style.display = 'inline';
  deck = createDeck();
  shuffleCards(deck);
  playerCards = [getNextCard(),getNextCard()];
  dealerCards = [getNextCard(),getNextCard()];
  gameStarted = true;
  showStatus();
})
function getNumericValue(card){
  switch(card.value){
    case 'Ace': 
      return 1;
    case 'Two': 
      return 2;
    case 'Three': 
      return 3;
    case 'Four' :
      return 4;
    case 'Five' : 
      return 5;
    case 'Six'  : 
      return 6;
    case 'Seven' : 
      return 7;
    case 'Eight' : 
      return 8;
    case 'Nine' : 
      return 9;
    case 'Ten' :
      return 10;
    default :
    return 10;
  }
}
function getScores(cardArray){
  let score = 0;
  let hasAce = false
  for(let i=0;i < cardArray.length;i++){
    let card = cardArray[i];
    score += getNumericValue(card);
    if(card.value == "Ace"){
      hasAce = true;
    }
  }
  if(hasAce && score <= 21){
    return score +10;
  }
 
  return score
}
function UpdateScores(){
  playerScore = getScores(playerCards);
  dealerScore = getScores(dealerCards);
}
               
function createDeck(){
  let deck = [];
for(let sidx = 0; sidx < suits.length ; sidx++){
  for(let vidx =0; vidx< values.length; vidx++){
    card = {
      suit : suits[sidx],
      value : values[vidx]
    }
    deck.push( card);
  }
}
return deck;
}


function getNextCard(){
  return deck.shift();
}
function getCardString(card){
  return card.value + " of " + card.suit;
}
function showStatus(){
  toDisplay = "Welcome to BlackJack!";
UpdateScores();
checkForEndOfGame();
toDisplay += " \n \n Dealer has :";
for(let card = 0;card<dealerCards.length;card++){
  toDisplay += '\n';
  toDisplay += getCardString(dealerCards[card]);
}
toDisplay += " \n Dealer Score is :"+ dealerScore;

toDisplay += '\n \n Player has :'
for(let card = 0;card<playerCards.length;card++){
  toDisplay += '\n';
  toDisplay += getCardString(playerCards[card]);
}
toDisplay += '\n Player Score is :'+ playerScore;
textArea.innerText = toDisplay;
if(gameOver){
	if(gameTie){
		textArea.innerText += "\n Tie!";
	}
  else if(playerWon){
    textArea.innerText += "\n You Win!";
  }
  else{
    textArea.innerText += "\n Dealer Wins!"
  }
  newGame.style.display = 'inline';
  hit.style.display = 'none';
  stay.style.display = 'none';
}
}
function shuffleCards(deck){
  for(let i=0;i<deck.length;i++){
    let swapidx = Math.trunc(Math.random()*deck.length);
    tmp = deck[i];
    deck[i]=deck[swapidx];
    deck[swapidx] = tmp;
  }
}
hit.addEventListener('click',function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
})
stay.addEventListener('click',function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
})
function checkForEndOfGame(){
  UpdateScores();
  if(gameOver){
    while(dealerScore<playerScore && playerScore<=21 && dealerScore<=21){
      dealerCards.push(getNextCard());
      UpdateScores();
    }
  }
  else if(dealerScore > 21){
    palyerWon = true;
    gameOver = true;
  }
  else if(playerScore >21){
    playerWon = false;
    gameOver = true;
  }
  else if(!gameOver){
    if(playerScore > dealerScore){
      playerWon = true;
    }
	else if(playerScore == dealerScore){
		gameTie = true;
		
	}
    else{
      playerWon = false;
    }

  }
}

