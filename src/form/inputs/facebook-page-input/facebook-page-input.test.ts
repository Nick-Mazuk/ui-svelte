context('FacebookPageInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/FacebookPageInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
