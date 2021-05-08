it('renders', () => {
    cy.loadStory('Form/Inputs/CheckInput', 'Default')
    cy.checkAccessibility()
})

export {}
