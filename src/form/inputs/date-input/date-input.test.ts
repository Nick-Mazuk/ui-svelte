context('DateInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/DateInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
