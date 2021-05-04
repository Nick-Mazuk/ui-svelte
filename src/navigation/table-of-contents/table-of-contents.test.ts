it('renders', () => {
    cy.loadStory('Navigation/TableOfContents', 'Default')
    cy.checkAccessibility()
})

export {}
