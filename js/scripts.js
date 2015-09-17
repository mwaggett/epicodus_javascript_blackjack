var cardValues = function() {
  var cardValues = new Map();

  cardValues.set("A", 11);
  cardValues.set(2, 2);
  cardValues.set(3, 3);
  cardValues.set(4, 4);
  cardValues.set(5, 5);
  cardValues.set(6, 6);
  cardValues.set(7, 7);
  cardValues.set(8, 8);
  cardValues.set(9, 9);
  cardValues.set(10, 10);
  cardValues.set("J", 10);
  cardValues.set("Q", 10);
  cardValues.set("K", 10);
  return cardValues;
}

var createSuits = function() {
  var suits = ["clubs", "diamonds", "hearts", "spades"];
  return suits;
}

var createValues = function() {
  var values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
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
  return newCard;
}

var containsAce = function(hand) {
  var aces = 0;
  for (var index in hand) {
    var card = hand[index];
    if (card[0] === "A") {
      aces++;
    }
  }
  return aces;
}

var getScore = function(hand) {
  var score = 0;
  for (var index in hand) {
    var card = hand[index];
    var value = cardValues().get(card[0]);
    score += value;
  }
  for (var i = 0; i < containsAce(hand); i++) {
    if (score > 21) {
      score -= 10;
    }
  }
  return score;
}

var bust = function(hand) {
  var score = getScore(hand);
  return score > 21;
}

var dealerTurn = function(hand, deck) {
  while (getScore(hand) < 17) {
    hitMe(hand, deck);
  }
  return hand;
}

var getWinner = function(dealerHand, playerHand) {
  if (bust(playerHand)) {
    return "Dealer";
  } else if (bust(dealerHand) || getScore(playerHand) > getScore(dealerHand)) {
    return "Player";
  } else if (getScore(dealerHand) > getScore(playerHand)) {
    return "Dealer";
  } else {
    return null;
  }
}



$(document).ready(function() {
  $("form#play").submit(function(event) {
    $("#dealer").empty();
    $("#player").empty();

    var deck = createDeck();
    var player = createHand(deck);
    var dealer = createHand(deck);

    $("#dealer").append("<div class=\"card\" id=\"hidden-card\"><p>?</p></div>");
    for(var index = 1; index < dealer.length; index++) {
      var suit = dealer[index][1];
      var value = dealer[index][0];
      $("#dealer").append("<div class=\"card suit"+suit+"\"><p>"+value+"</p></div>");
    }

    for(var index in player) {
      var suit = player[index][1];
      var value = player[index][0];
      $("#player").append("<div class=\"card suit"+suit+"\"><p>"+value+"</p></div>");
    }

    $("form#hit").submit(function(event) {
      var newCard = hitMe(player, deck);
      var suit = newCard[1];
      var value = newCard[0];
      $("#player").append("<div class=\"card suit"+suit+"\"><p>"+value+"</p></div>");
      if (bust(player)) {
        $("#message").text("Bust! Dealer wins!")
        $('#myModal').modal('show');
      }
      event.preventDefault();
    });

    $("form#stay").submit(function(event) {
      var revealedCard = dealer[0];
      var revealedSuit = revealedCard[1];
      var revealedValue = revealedCard[0];
      $("#hidden-card").replaceWith("<div class=\"card suit"+revealedSuit+"\"><p>"+revealedValue+"</p></div>");

      while (getScore(dealer) < 17) {
        var newCard = hitMe(dealer, deck);
        var suit = newCard[1];
        var value = newCard[0];
        $("#dealer").append("<div class=\"card suit"+suit+"\"><p>"+value+"</p></div>");
      }
      if (bust(dealer)) {
        $("#message").text("Bust! Player wins!");
      } else {
        var winner = getWinner(dealer, player);
        if (winner !== null) {
          $("#message").text("Bust! "+winner+" wins!");
        } else {
          $("#message").text("It's a tie!");
        }
      }
      $('#myModal').modal('show');
      event.preventDefault();
    });

    $(".new-game").show();
    $("#play").hide();
    event.preventDefault();
  });
});


// <div class="card suithearts">
//   <p>A</p>
// </div>
