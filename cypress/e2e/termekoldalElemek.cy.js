describe('Termék oldal elem tesztek', () => {
  it('Megjelennek az oldal betöltésekor a megfelelő elemek', () => {
    cy.visit('http://localhost/vadaszProjekt/frontend/termekek/termekek.html');
    cy.get('.navbar').should('be.visible');
    cy.get('.kategoriavalaszto-wrapper').should('be.visible');
    cy.get('#termekKategoria').should('be.visible');
    cy.get('.szuro').should('be.visible');
    cy.get('#termekKartyaMezo').should('exist');
    cy.get('.footer').should('be.visible');
  })
  it('Termék kártyák megjelennek, kategóriának megfelelően (1-es kategória)', () => {
    cy.visit('http://localhost/vadaszProjekt/frontend/termekek/termekek.html');
    cy.get('#termekKategoria').select('1');
    cy.get('#termekKartyaMezo')
      .find('.card')
      .should('have.length', 8);
  })
})