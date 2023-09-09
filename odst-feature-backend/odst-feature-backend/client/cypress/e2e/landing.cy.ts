describe('Landing Page Tests', () => {
  it('Loads the landing Page', () => {
    cy.visit('localhost:3000');
    cy.contains('Landing Page');
  });
});
