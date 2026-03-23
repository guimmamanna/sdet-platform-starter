describe('cypress inventory regression coverage', () => {
  beforeEach(() => {
    cy.resetDemoState();
    cy.loginByUi();
  });

  it('intercepts inventory requests while completing a CRUD flow', () => {
    cy.fixture('item').then((item) => {
      const title = `${item.title} ${Date.now()}`;
      const updatedTitle = `${title} updated`;

      cy.intercept('GET', '**/api/items*').as('getItems');

      cy.get('[data-testid="item-title"]').type(title);
      cy.get('[data-testid="item-description"]').type(item.description);
      cy.get('[data-testid="item-submit"]').click();
      cy.get('[data-testid="toast-message"]').should('contain.text', 'Item created successfully');

      cy.get('[data-testid="search-input"]').clear().type(title);
      cy.get('[data-testid="search-submit"]').click();
      cy.wait('@getItems').its('response.statusCode').should('eq', 200);
      cy.contains('.item-card', title).should('be.visible');

      cy.contains('.item-card', title).within(() => {
        cy.contains('button', 'Edit').click();
      });

      cy.get('[data-testid="item-title"]').clear().type(updatedTitle);
      cy.get('[data-testid="item-description"]')
        .clear()
        .type('Updated through Cypress to demonstrate legacy-framework breadth.');
      cy.get('[data-testid="item-submit"]').click();
      cy.get('[data-testid="toast-message"]').should('contain.text', 'Item updated successfully');

      cy.get('[data-testid="search-input"]').clear().type(updatedTitle);
      cy.get('[data-testid="search-submit"]').click();
      cy.contains('.item-card', updatedTitle).within(() => {
        cy.contains('button', 'Delete').click();
      });

      cy.get('[data-testid="toast-message"]').should('contain.text', 'Item deleted successfully');
      cy.get('[data-testid="search-input"]').clear().type(updatedTitle);
      cy.get('[data-testid="search-submit"]').click();
      cy.get('[data-testid="empty-state"]').should('be.visible');
    });
  });
});

