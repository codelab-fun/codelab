context("home page", () => {

    beforeEach(() => {
        cy.visit('Http://localhost:4200/');
    })

    it("typescript should be clickable", () => {
        cy.get('.learn-box.typescript').click()
        cy.location().should(location => {
            expect(location.href).to.eq('http://localhost:4200/typescript/intro')
        })
    })
})