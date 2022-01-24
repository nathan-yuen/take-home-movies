describe('Detail Page', () => {
  beforeEach(() => {
    cy.log('Visiting MoviePage');
    cy.visit('/movies/avengers-infinity-war-2018');
  });

  it('Should have valid info', () => {
    cy.get('.movie-detail-title').should('have.text', 'Avengers: Infinity War');
    cy.get('.movie-detail-year').should('have.text', '2018');
    cy.get('.movie-detail-length').should('have.text', '2h 29min');
    cy.get('.movie-detail-director')
      .should('contain.text', 'Anthony Russo')
      .should('contain.text', 'Joe Russo');

    cy.get('.movie-detail-cast')
      .should('contain.text', 'Robert Downey Jr')
      .should('contain.text', 'Chris Hemsworth')
      .should('contain.text', 'Mark Ruffalo');
  });
 });