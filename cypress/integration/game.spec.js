describe('The Game Page', () => {
  it('Successfully loads', () => {
    cy.visit('/');
  });

  it('Game App exists', () => {
    expect(cy.get('#root')).to.exist;
  });
});
