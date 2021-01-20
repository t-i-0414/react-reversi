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

  it('Successfully Game Start', () => {
    cy.get('[data-cy="start"]').click();
    expect(cy.get('[data-cy="board"]')).to.exist;
  });

  it('Successfully Square click', () => {
    cy.get('[data-cy="square-20"]').click();
    cy.get('[data-cy="square-21"]').click();
  });
});
