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
  debugger;
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




$(document).ready(function() {

});
