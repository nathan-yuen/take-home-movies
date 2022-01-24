describe('Index Page', () => {
  beforeEach(() => {
    cy.log('Visiting HomePage');
    cy.visit('/');
  });

  it('Should have app title', () => {
    cy.get('#app-title').should('have.text', 'Wookie Movies');
  });

  // Not robust, but assuming api is static for now
  it('Should have "Action" as the first genre title', () => {
    cy.get('.movie-carousel-title').first().should('have.text', 'Action');
  });

  it('Search bar should accept text input', () => {
    cy.get('#search-input')
      .type('batman')
      .should('have.value', 'batman');
  });

  it('Hitting <Enter> on search should redirect to results', () => {
    cy.get('#search-input').type('batman{enter}');
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/search?q=batman');
    });
    cy.get('#search-input').should('have.value','batman');
    cy.get('.movie-tile').should('have.length', 2);
  });

  it('Clicking on cards should redirect to details', () => {
    cy.get('.movie-tile').first().click();
    cy.location().should((loc) => {
      expect(loc.href).to.contains('http://localhost:3000/movies/');
    });
  });  
 });