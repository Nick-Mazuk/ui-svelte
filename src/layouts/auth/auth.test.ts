context('Auth', () => {
    it('renders', () => {
        cy.loadStory('Layouts/Auth', 'Default')
        cy.checkAccessibility()
    })
})

export {}
