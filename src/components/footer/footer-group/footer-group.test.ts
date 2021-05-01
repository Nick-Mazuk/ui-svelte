it('it functions', () => {
    cy.loadStory('Components/Footer/FooterGroup', 'Default')
    cy.checkAccessibility()

    cy.screenSize('sm')
    cy.checkAccessibility()
    cy.contains('Home').should('not.be.visible')
    cy.get('h3:visible').contains('Other').click()
    cy.contains('Home').should('be.visible')
    cy.get('h3:visible').contains('Other').click()
    cy.contains('Home').should('not.be.visible')

    cy.tab().realPress(' ')
    cy.contains('Home').should('be.visible')
    cy.realPress(' ')
    cy.contains('Home').should('not.be.visible')
})

export {}
