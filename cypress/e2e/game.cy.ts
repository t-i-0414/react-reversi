describe('The Game Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Successfully loads', () => {
    cy.visit('/');
  });

  it('Game App exists', () => {
    expect(cy.get('[data-cy="setting-form"]')).to.exist;
  });

  it('Game App Title exists', () => {
    cy.title().should('eq', 'React Reversi');
  });

  it('Unsuccessfully Game Start', () => {
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
  });

  it('Unsuccessfully Square click', () => {
    cy.get('[data-cy="clickable"]').should('not.exist');
  });
});
