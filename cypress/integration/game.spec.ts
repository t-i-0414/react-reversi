describe('The Game Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Successfully loads', () => {
    cy.visit('/');
  });

  it('Game App exists', () => {
    expect(cy.get('[data-cy="game"]')).to.exist;
  });

  it('Game App Title exists', () => {
    cy.title().should('eq', 'React App');
  });

  it('Unsuccessfully Game Start', () => {
    cy.get('[data-cy="board"]').should('not.exist');
  });

  it('Successfully Game Start', () => {
    cy.get('[data-cy="input-sideSquaresCount"]').type("8");
    cy.get('[data-cy="start"]').click();
    expect(cy.get('[data-cy="board"]')).to.exist;
  });

  it('Successfully Square click', () => {
    cy.get('[data-cy="input-sideSquaresCount"]').as('range').invoke('val', 8).trigger('change')
    cy.get('[data-cy="start"]').click();
    for (let n = 0; n < 60; n++) {
      if (n % 2 === 0) {
        cy.get('[data-cy="clickable"]').first().click();
      } else {
        cy.get('[data-cy="clickable"]').last().click();
      }
    }
  });

  it('Unsuccessfully Square click', () => {
    cy.get('[data-cy="clickable"]').should('not.exist');
  });
});
