describe('Search page', () => {
  beforeEach(() => {
    cy.log('Visiting SearchPage');
    cy.visit('/search?q=batman');
  });

  it('Search results should be present', () => {
    cy.get('.movie-tile').should('have.length.greaterThan', 1);    
    cy.get('#search-input').should('have.value', 'batman');
  });

  it('Navigate to homepage should clear search input', () => {
    cy.get('#app-title > a').click();
    cy.get('#search-input').should('have.value', '');
  });

  it('Navigate to detail should clear search input', () => {
    cy.get('.movie-tile').first().click();
    cy.get('#search-input').should('have.value', '');
  });

  it('Random search input should have no results', () => {
    cy.get('#search-input').clear().type('238490128309uoiaysdroufs{enter}');
    cy.get('.movie-tile').should('have.length', 0);
    cy.get('.empty-message').should('be.visible');
  });
});