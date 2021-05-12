context('ComponentTemplate', () => {
    it('renders', () => {
        cy.loadStory('ComponentTemplateWithCategory', 'Default')
        cy.checkAccessibility()
    })
})

export {}
