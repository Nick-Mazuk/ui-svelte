it('renders', () => {
    cy.loadStory('Components/List', 'Default')
    cy.checkAccessibility()
})

export {}
