describe('Termék oldal szűrési tesztek', () => {
  it('Keresés szerint megfelelő termékek jellenek meg', () => {
    cy.visit('http://localhost/vadaszProjekt/frontend/termekek/termekek.html');
    cy.get('#termekKategoria').select('1');
    cy.get('#kereso').type('sapka');
    cy.wait(500);
    cy.get('#termekKartyaMezo .card').each(($kartya) => {
      cy.wrap($kartya).then(($kartya) => {
        const termekNev = $kartya.find('.card-title').text().toLowerCase();
        const termekLeiras = $kartya.find('.card-text').text().toLowerCase();
        expect(
          (termekNev).includes('sapka') || (termekLeiras).includes('sapka')
        ).to.be.true;
      })
    });
  })

  it('Ár határok között vannak a megjelenő termékek', () => {
    cy.visit('http://localhost/vadaszProjekt/frontend/termekek/termekek.html');
    cy.get('#termekKategoria').select('1');
    cy.get('#minAr').type('1000');
    cy.get('#maxAr').type('5000');
    cy.wait(500);
    cy.get('#termekKartyaMezo .card').each(($kartya) => {
      cy.wrap($kartya).then(($kartya) => {
        const termekAr = parseInt($kartya.find('.arResz').text().replace(/\D/g, ''));
        expect(termekAr).to.be.at.least(1000);
        expect(termekAr).to.be.at.most(5000);
      })
    });
  })
})