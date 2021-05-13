context('Footer', () => {
    it('functions correctly', () => {
        cy.loadStory('Components/Footer', 'Subfooter')
        cy.checkAccessibility()
        cy.screenSize('md')
        cy.checkAccessibility()
        cy.screenSize('sm')
        cy.checkAccessibility()

        cy.get('[data-test="footer-link"]').should('not.be.visible')
        cy.get('[data-test="footer-group-title"]:visible').first().click()
        cy.get('[data-test="footer-link"]').should('be.visible')
        cy.get('[data-test="footer-group-title"]:visible').first().click()
        cy.get('[data-test="footer-link"]').should('not.be.visible')

        cy.tab().realPress(' ')
        cy.get('[data-test="footer-link"]').should('be.visible')
        cy.realPress(' ')
        cy.get('[data-test="footer-link"]').should('not.be.visible')
        cy.tab().realPress(' ')
        cy.get('[data-test="footer-link"]').should('be.visible')
        cy.realPress(' ')
        cy.get('[data-test="footer-link"]').should('not.be.visible')
    })
})

export {}
