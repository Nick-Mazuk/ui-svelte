context('Label', () => {
    it('renders', () => {
        cy.loadStory('Form/Label', 'Default')
        cy.checkAccessibility()
    })
})

export {}
