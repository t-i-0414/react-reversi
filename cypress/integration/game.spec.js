beforeEach(() => {
  cy.viewport(1366, 768);
});

describe('The Game Page', () => {
  it('Successfully loads', () => {
    cy.visit('/');
  });

  it('Game App exists', () => {
    expect(cy.get('[data-cy="game"]')).to.exist;
  });

  it('Game App Title exists', () => {
    expect(cy.title('My App')).to.exist;
  });

  it('Unsuccessfully Game Start', () => {
    cy.get('[data-cy="board"]').should('not.exist');
  });

  it('Successfully Game Start', () => {
    cy.get('[data-cy="start"]').click();
    expect(cy.get('[data-cy="board"]')).to.exist;
  });

  it('Successfully Square click', () => {
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
