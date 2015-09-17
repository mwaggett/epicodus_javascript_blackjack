var cardValues = function() {
  var cardValues = new Map();

  cardValues.set("Ace", 11);
  cardValues.set(2, 2);
  cardValues.set(3, 3);
  cardValues.set(4, 4);
  cardValues.set(5, 5);
  cardValues.set(6, 6);
  cardValues.set(7, 7);
  cardValues.set(8, 8);
  cardValues.set(9, 9);
  cardValues.set(10, 10);
  cardValues.set("Jack", 10);
  cardValues.set("Queen", 10);
  cardValues.set("King", 10);
  return cardValues;
}

var createSuits = function() {
  var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  return suits;
}

var createValues = function() {
  var values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
  return values;
}

var createDeck = function() {
  var suits = createSuits();
  var values = createValues();
  var deck = [];

  for (var suit in suits) {
    for (var value in values) {
      deck.push([values[value], suits[suit]]);
    }
  }
  return deck;
}

var drawCard = function(deck) {
  var randomIndex = Math.floor((Math.random() * deck.length));
  var drawnCard = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return drawnCard;
}

var createHand = function(deck) {
  var firstCard = drawCard(deck);
  var secondCard = drawCard(deck);
  return [firstCard, secondCard];
}

var hitMe = function(hand, deck) {
  var newCard = drawCard(deck);
  hand.push(newCard);
  return hand;
}

var getScore = function(hand) {
  var score = 0;
  for (var index in hand) {
    var card = hand[index];
    var value = cardValues().get(card[0]);
    score += value;
  }
  return score;
}





// $(document).ready(function() {
//
// });
