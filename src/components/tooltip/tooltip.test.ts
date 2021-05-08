it('functions', () => {
    cy.loadStory('Components/Tooltip', 'Default')
    cy.checkAccessibility()
    cy.get('[data-test="tooltip"]').should('not.exist')
    cy.tab()
    cy.get('[data-test="tooltip"]').should('be.visible')
    cy.realPress('Tab')
    cy.get('[data-test="tooltip"]').should('not.exist')
    cy.get('[data-test="tooltip-trigger"]').realHover()
    cy.get('[data-test="tooltip"]').should('be.visible')
})

it('is still visible after click', () => {
    cy.loadStory('Components/Tooltip', 'Custom trigger')
    cy.get('button').realHover()
    cy.get('[data-test="tooltip"]').should('be.visible')
    cy.get('button').realClick()
    cy.get('[data-test="tooltip"]').should('be.visible')
})

export {}
