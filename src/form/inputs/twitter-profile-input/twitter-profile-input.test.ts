context('TwitterProfileInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/TwitterProfileInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
