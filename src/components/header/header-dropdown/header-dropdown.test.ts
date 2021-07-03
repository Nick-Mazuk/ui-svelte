const content = '[data-test="header-dropdown-content"]'

context('HeaderDropdown', () => {
    it('renders', () => {
        cy.loadStory('Components/Header/HeaderDropdown', 'Default')
        cy.checkAccessibility()
        cy.get(content).should('not.exist')
        cy.get('button').realHover()
        cy.get(content).should('exist')
        cy.get(content).realHover()
        cy.get(content).should('exist')
        cy.get('body').realHover({ position: 'topLeft' })
        cy.get(content).should('not.exist')

        cy.get('button').realClick()
        cy.get(content).should('exist')
        cy.get(content).realClick()
        cy.get(content).should('exist')
    })
})

export {}
