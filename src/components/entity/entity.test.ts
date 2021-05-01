it('is accessible', () => {
    cy.loadStory('Components/Entity', 'Default')
    cy.checkAccessibility()
})

export {}
