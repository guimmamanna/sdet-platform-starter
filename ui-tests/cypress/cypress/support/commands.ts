declare global {
  namespace Cypress {
    interface Chainable {
      loginByUi(username?: string, password?: string): Chainable<void>;
      resetDemoState(state?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('resetDemoState', (state = 'default') => {
  cy.request('POST', `${Cypress.env('apiUrl')}/test/reset`, { state });
});

Cypress.Commands.add(
  'loginByUi',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.visit('/');
    cy.get('[data-testid="login-username"]').clear().type(username);
    cy.get('[data-testid="login-password"]').clear().type(password, { log: false });
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="inventory-workspace"]').should('be.visible');
  },
);

export {};

