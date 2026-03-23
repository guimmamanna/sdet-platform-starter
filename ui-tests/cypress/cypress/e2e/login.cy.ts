describe('cypress authentication smoke coverage', () => {
  beforeEach(() => {
    cy.resetDemoState();
  });

  it('logs in with the seeded user', () => {
    cy.loginByUi();
    cy.get('[data-testid="result-count"]').should('contain.text', '3 item(s)');
    cy.contains('.item-card', 'Laptop stand').should('be.visible');
  });

  it('shows an error for invalid credentials', () => {
    cy.visit('/');
    cy.get('[data-testid="login-username"]').clear().type('bad-user');
    cy.get('[data-testid="login-password"]').clear().type('bad-password', { log: false });
    cy.get('[data-testid="login-submit"]').click();

    cy.get('[data-testid="toast-message"]').should('contain.text', 'Invalid username or password');
  });
});

