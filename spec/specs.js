describe('cardValues', function() {
  it("is a map", function() {
    expect(cardValues()).to.be.instanceOf(Map);
  });

  it("creates key/value pairs of card numbers and their blackjack values", function() {
    expect(cardValues().get("K")).to.equal(10);
  });
});

describe('createSuits', function() {
  it("creates array of suits", function() {
    expect(createSuits()).to.be.instanceOf(Array);
  });

  it("contains suits", function() {
    expect(createSuits()).to.contain("hearts");
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
    expect(createDeck()[0]).to.eql(["A", "clubs"]);
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

describe('containsAce', function() {
  it("returns true if hand contains ace", function() {
    var hand = [["A", "spades"], ["K", "diamonds"]];
    expect(containsAce(hand)).to.equal(true);
  });

  it("returns false if hand doesn't contain ace", function() {
    var hand = [[2, "spades"], ["K", "diamonds"]];
    expect(containsAce(hand)).to.equal(false);
  });
});

describe('getScore', function() {
  it("adds values of cards in the hand", function() {
    var hand = [[2, "spades"], ["K", "diamonds"]];
    expect(getScore(hand)).to.equal(12);
  });

  it("counts ace as 11 when not bust", function() {
    var hand = [["A", "spades"], ["K", "diamonds"]];
    expect(getScore(hand)).to.equal(21);
  });

  it("counts ace as 1 when otherwise bust", function() {
    var hand = [["A", "spades"], ["K", "diamonds"], [5, "hearts"]];
    expect(getScore(hand)).to.equal(16);
  });
});

describe('bust', function() {
  it("returns true when hand score is greater than 21", function() {
    var hand = [[2, "spades"], ["K", "diamonds"], ["J", "hearts"]];
    expect(bust(hand)).to.equal(true);
  });

  it("returns false when hand score is not greater than 21", function() {
    var hand = [[2, "spades"], ["K", "diamonds"], [5, "hearts"]];
    expect(bust(hand)).to.equal(false);
  });
});

describe('dealerTurn', function() {
  it("hits when score is below 17", function() {
    var deck = createDeck();
    var hand = [[2, "spades"], ["K", "diamonds"]];
    expect(getScore(dealerTurn(hand, deck))).to.be.above(12);
  });

  it("stays when score is above 17", function() {
    var deck = createDeck();
    var hand = [[9, "spades"], ["K", "diamonds"]];
    expect(getScore(dealerTurn(hand, deck))).to.equal(19);
  });
});

describe('getWinner', function() {
  it("returns dealer if player is bust", function() {
    var playerHand = [[2, "spades"], ["K", "diamonds"], ["J", "hearts"]];
    var dealerHand = [[10, "clubs"], [5, "hearts"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(dealerHand);
  });

  it("returns player if dealer is bust", function() {
    var dealerHand = [[2, "spades"], ["K", "diamonds"], ["J", "hearts"]];
    var playerHand = [[10, "clubs"], [5, "hearts"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(playerHand);
  });

  it("returns player if player is closer to 21 than dealer", function() {
    var dealerHand = [[10, "clubs"], [5, "hearts"]];
    var playerHand = [[10, "spades"], ["K", "hearts"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(playerHand);
  });

  it("returns dealer if dealer is closer to 21 than player", function() {
    var playerHand = [[10, "clubs"], [5, "hearts"]];
    var dealerHand = [[10, "spades"], ["K", "hearts"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(dealerHand);
  });

  it("returns null if dealer and player have the same score", function() {
    var playerHand = [[10, "clubs"], ["K", "hearts"]];
    var dealerHand = [[10, "spades"], ["K", "diamonds"]];
    expect(getWinner(dealerHand, playerHand)).to.eql(null);
  });

});
