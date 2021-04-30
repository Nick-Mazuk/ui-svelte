it('renders', () => {
    cy.loadStory('ComponentTemplateWithCategory', 'Default')
    cy.checkA11y()
})

export {}
