context('Tooltip', () => {
    it('functions', () => {
        cy.loadStory('Components/Tooltip', 'Default')
        cy.checkAccessibility()
        cy.get('[data-test="tooltip"]').should('not.exist')
        cy.tab()
        cy.get('[data-test="tooltip"]').should('be.visible')
        cy.realPress('Tab')
        cy.get('[data-test="tooltip"]').should('not.exist')
        cy.get('button').realHover()
        cy.get('[data-test="tooltip"]').should('be.visible')
    })
})

export {}
