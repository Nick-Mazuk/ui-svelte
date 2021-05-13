context('Error', () => {
    it('renders', () => {
        cy.loadStory('Elements/Error', 'Default')
        cy.checkAccessibility()
    })
})

export {}
