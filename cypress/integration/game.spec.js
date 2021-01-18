describe('The Game Page', () => {
  it('Successfully loads', () => {
    cy.visit('/');
  });

  // TODO:More detail should be given about having a game app
  // TODO:Add more test
  it('Game App exists', () => {
    expect(cy.get('#root')).to.exist;
  });

  it('Game App Title exists', () => {
    expect(cy.title('My App')).to.exist;
  });
});
