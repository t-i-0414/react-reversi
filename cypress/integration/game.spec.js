describe('The Game Page', () => {
  it('Successfully loads', () => {
    cy.visit('/');
  });

  // TODO:More detail should be given about having a game app
  it('Game App exists', () => {
    expect(cy.get('#root')).to.exist;
  });
});
