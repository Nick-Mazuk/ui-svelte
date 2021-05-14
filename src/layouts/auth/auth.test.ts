context('Auth', () => {
    it('renders', () => {
        cy.loadStory('Layouts/Auth', 'Default')

        cy.checkAccessibility()
        cy.get('a').should('have.attr', 'href', '/')

        cy.loadStory('Layouts/Auth', 'With logo')
        cy.checkAccessibility()
        cy.get('a').should('have.attr', 'href', '/')

        cy.loadStory('Layouts/Auth', 'With links')
        cy.checkAccessibility()
        cy.get('a').should('have.attr', 'href', '/')
        cy.get('a').eq(1).should('have.attr', 'href', '#')

        cy.loadStory('Layouts/Auth', 'Example')
        cy.checkAccessibility({ page: true })
    })
})

export {}
