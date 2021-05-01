it('responds to breakpoints', () => {
    cy.loadStory('Components/Header/HeaderItemWrapper', 'Breakpoints')

    cy.contains("breakpoint='none'").should('be.visible')
    cy.contains("breakpoint='sm'").should('be.visible')
    cy.contains("breakpoint='md'").should('be.visible')
    cy.checkAccessibility()

    cy.screenSize('md')
    cy.contains("breakpoint='none'").should('be.visible')
    cy.contains("breakpoint='sm'").should('be.visible')
    cy.contains("breakpoint='md'").should('not.be.visible')
    cy.checkAccessibility()

    cy.screenSize('sm')
    cy.contains("breakpoint='none'").should('be.visible')
    cy.contains("breakpoint='sm'").should('not.be.visible')
    cy.contains("breakpoint='md'").should('not.be.visible')
    cy.checkAccessibility()
})

export {}
