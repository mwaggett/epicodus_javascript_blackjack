describe('cardValues', function() {
  it("is a map", function() {
    expect(cardValues()).to.be.instanceOf(Map);
  });

  it("creates key/value pairs of card numbers and their blackjack values", function() {
    expect(cardValues().get("King")).to.equal(10);
  });
});

describe('createSuits', function() {
  it("creates array of suits", function() {
    expect(createSuits()).to.be.instanceOf(Array);
  });

  it("contains suits", function() {
    expect(createSuits()).to.contain("Hearts");
  });
});

describe('createDeck', function() {
  it("creates deck of 52 cards", function() {
    expect(createDeck().length).to.equal(52);
  });

  it("creates array of cards", function() {
    expect(createDeck()).to.be.instanceOf(Array);
  });

  it("contains array of card value map and suit string", function() {
    expect(createDeck()[0]).to.eql(["Ace", "Clubs"]);
  });
});

describe('drawCard', function() {
  it("draws random card from the deck", function() {
    expect(drawCard(createDeck())).to.be.instanceOf(Array);
  });

  it("removes top card from deck", function() {
    var deck = createDeck();
    drawCard(deck);
    expect(deck.length).to.equal(51);
  });
});

describe('createHand', function() {
  it("picks two random cards from the deck and stores them in an array", function() {
    expect(createHand(createDeck())).to.be.instanceOf(Array);
  });

  it("picks two random cards from the deck", function() {
    expect(createHand(createDeck()).length).to.equal(2);
  });

  it("decreases deck by 2", function() {
    var deck = createDeck();
    createHand(deck);
    expect(deck.length).to.equal(50);
  });
});

describe('hitMe', function() {
  it("adds a random card from the deck to the hand", function() {
    var deck = createDeck();
    var hand = createHand(deck);
    expect(hitMe(hand,deck).length).to.equal(3);
  });
});

describe('getScore', function() {
  it("adds values of cards in the hand", function() {
    var hand = [[2, "Spades"], ["King", "Diamonds"]];
    expect(getScore(hand)).to.equal(12);
  });
});

describe('bust', function() {
  it("returns true when hand score is greater than 21", function() {
    var hand = [[2, "Spades"], ["King", "Diamonds"], ["Jack", "Hearts"]];
    expect(bust(hand)).to.equal(true);
  });

  it("returns false when hand score is not greater than 21", function() {
    var hand = [[2, "Spades"], ["King", "Diamonds"], [5, "Hearts"]];
    expect(bust(hand)).to.equal(false);
  });
});

describe('getWinner', function() {
  it("returns dealer if player is bust", function() {
    var playerHand = [[2, "Spades"], ["King", "Diamonds"], ["Jack", "Hearts"]];
    var dealerHand = [[10, "Clubs"], [5, "Hearts"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(dealerHand);
  });

  it("returns player if dealer is bust", function() {
    var dealerHand = [[2, "Spades"], ["King", "Diamonds"], ["Jack", "Hearts"]];
    var playerHand = [[10, "Clubs"], [5, "Hearts"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(playerHand);
  });

  it("returns player if player is closer to 21 than dealer", function() {
    var dealerHand = [[10, "Clubs"], [5, "Hearts"]];
    var playerHand = [[10, "Spades"], ["King", "Hearts"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(playerHand);
  });

  it("returns dealer if dealer is closer to 21 than player", function() {
    var playerHand = [[10, "Clubs"], [5, "Hearts"]];
    var dealerHand = [[10, "Spades"], ["King", "Hearts"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(dealerHand);
  });

  it("returns null if dealer and player have the same score", function() {
    var playerHand = [[10, "Clubs"], ["King", "Hearts"]];
    var dealerHand = [[10, "Spades"], ["King", "Diamonds"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(null);
  });

});
