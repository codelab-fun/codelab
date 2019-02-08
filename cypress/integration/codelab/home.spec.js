/// <reference types="Cypress" />

context('home page', () => {
    beforeEach(() => {
      cy.viewport(2400, 1370);
      cy.visit('http://localhost:4200/');
    });
  
    it('home page is the same', () => {
      cy.matchImageSnapshot('home');
    });
  
    it('typescript page should look the same', () => {
      cy.get('.learn-box.typescript').click().url().then(loc => {
        let count = 0;
        check("http://localhost:4200/", count);
      });
    });
  });
  
  function check(prevLocation, count) {
    count += 1;
    // cy.log(count, prevLocation);
    //stop checking for screenshot until url is done changing
    cy.url().should(loc => {
      expect(typeof(loc) === "string").to.be.true;
      expect(loc).not.to.eq(prevLocation);
    });
    //yay pass, check screenshot and go to next page! 
    cy.url().then(location => {
      cy.matchImageSnapshot(location);
      cy.log(Cypress.$("button").hasClass(".arrow-right.arrow"));
      if(Cypress.$("button").hasClass("arrow-right")) {
        cy.get(".arrow-right.arrow").click();
        check(location, count);
      } else {
        cy.log("wohoo! Test is done")
      }
    });
  }