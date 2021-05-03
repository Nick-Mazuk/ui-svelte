it('renders', () => {
    cy.loadStory('Components/Header/HeaderMobileLink', 'Default')
    cy.checkAccessibility()
})

export {}
