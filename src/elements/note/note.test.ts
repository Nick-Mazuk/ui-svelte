context('Note', () => {
    it('renders', () => {
        cy.loadStory('Elements/Note', 'Default')
        cy.checkAccessibility()
    })
})

export {}
