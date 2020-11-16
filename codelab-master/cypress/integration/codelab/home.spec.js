context('home page', () => {
  beforeEach(() => {
    cy.viewport(2400, 1370);
    cy.visit('http://localhost:4200/');
  });

  it('didnt click on typescript', () => {
    cy.matchImageSnapshot('home');
  });

  it('typescript should be clickable', () => {
    cy.get('.learn-box.typescript').click();

    // cy.matchImageSnapshot("home");

    cy.location().should(location => {
      expect(location.href).to.eq('http://localhost:4200/typescript/intro');
    });
  });
});
