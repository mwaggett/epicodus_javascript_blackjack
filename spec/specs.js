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
