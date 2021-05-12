context('HeaderLink', () => {
    it('responds to breakpoints', () => {
        cy.loadStory('Components/Header/HeaderLink', 'Breakpoints')

        cy.get('a').contains('none').should('be.visible')
        cy.get('a').contains('sm').should('be.visible')
        cy.get('a').contains('md').should('be.visible')
        cy.checkAccessibility()

        cy.screenSize('md')
        cy.get('a').contains('none').should('be.visible')
        cy.get('a').contains('sm').should('be.visible')
        cy.get('a').contains('md').should('not.be.visible')
        cy.checkAccessibility()

        cy.screenSize('sm')
        cy.get('a').contains('none').should('be.visible')
        cy.get('a').contains('sm').should('not.be.visible')
        cy.get('a').contains('md').should('not.be.visible')
        cy.checkAccessibility()
    })
})

export {}
