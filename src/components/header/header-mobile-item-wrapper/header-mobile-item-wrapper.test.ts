it('renders', () => {
    cy.loadStory('Components/Header/HeaderMobileItemWrapper', 'Default')
    cy.checkAccessibility()
})

export {}
