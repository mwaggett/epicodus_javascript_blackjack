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
