it('renders', () => {
    cy.loadStory('Form/Inputs/TextInput', 'Default')
    cy.checkAccessibility()
})

export {}
