describe('The Game Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Title exists', () => {
    cy.title().should('eq', 'React Reversi');
  });

  it('Setting Form exists', () => {
    expect(cy.get('[data-cy="setting-form"]')).to.exist;
  });

  it('Board not exists', () => {
    cy.get('[data-cy="board"]').should('not.exist');
  });

  it('Successfully Game Start', () => {
    cy.get('[data-cy="input-numberOfSquaresPerSideOfBoard"]').type('8');
    cy.get('[data-cy="start-game"]').click();
    expect(cy.get('[data-cy="board"]')).to.exist;
  });

  it('Successfully Square click', () => {
    cy.get('[data-cy="input-numberOfSquaresPerSideOfBoard"]')
      .as('range')
      .invoke('val', 8)
      .trigger('change');
    cy.get('[data-cy="start-game"]').click();

    for (let n = 0; n < 60; n += 1) {
      cy.get('[data-cy="clickable"]').first().click();
    }

    cy.get('[data-cy="clickable"]').should('not.exist');
  });
});
