context('Menu', () => {
    it('functions correctly', () => {
        cy.loadStory('Components/Menu', 'Default')
        cy.checkAccessibility()

        cy.get('[data-test="menu"]').should('not.exist')
        cy.get('button').click()
        cy.get('[data-test="menu"]').should('exist')
        cy.get('[data-test="list"]').should('have.attr', 'role', 'menu')

        cy.checkAccessibility()
        cy.get('body').click()
        cy.get('[data-test="menu"]').should('not.exist')
        cy.get('button').click()
        cy.get('[data-test="menu"]').should('exist')
        cy.get('[data-test="list-item"]').first().click()
        cy.get('[data-test="menu"]').should('not.exist')

        cy.tab().realType(' ')
        cy.get('[data-test="menu"]').should('exist')
        cy.realPress('ArrowDown')
        cy.get('[data-test="list-item"]').first().should('have.attr', 'data-focused', 'true')
        cy.realType(' ')
        cy.get('[data-test="menu"]').should('not.exist')
        cy.get('button').should('be.focused')
    })

    it('width can be customized', () => {
        const width = 64
        cy.loadStory('Components/Menu', 'Default', { width: String(width) })
        cy.checkAccessibility()
        cy.get('button').click()
        cy.get('[data-test="menu"]')
            .invoke('outerWidth')
            .should('be.gte', width * 4)
    })
})

export {}
