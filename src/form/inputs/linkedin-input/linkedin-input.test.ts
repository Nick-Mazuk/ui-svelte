context('LinkedinInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/LinkedinInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
