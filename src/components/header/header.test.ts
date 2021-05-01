it('responds to breakpoints', () => {
    cy.loadStory('Components/Header', 'Default')
    cy.checkAccessibility()
})

export {}
