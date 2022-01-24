describe('Error Page', () => {
  beforeEach(() => {
    cy.log('Visiting non-exsiting page');
    cy.visit('/awu3oiualskjflsd', { failOnStatusCode: false });
  });

  it('Page should be 404', () => {
    cy.get('.empty-message').should('have.text', 'Page Not Found');
  });
 });