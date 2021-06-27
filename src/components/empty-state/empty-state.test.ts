context('EmptyState', () => {
    it('renders', () => {
        cy.loadStory('Components/EmptyState', 'Default')
        cy.checkAccessibility()
    })
})

export {}
