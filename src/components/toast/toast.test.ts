context('Toast', () => {
    it('renders', () => {
        cy.loadStory('Components/Toast', 'Default')
        cy.checkAccessibility()
    })
})

export {}
