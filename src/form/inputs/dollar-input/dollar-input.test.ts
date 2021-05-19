context('DollarInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/DollarInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
