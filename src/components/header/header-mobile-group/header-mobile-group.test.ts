context('HeaderMobileGroup', () => {
    it('renders', () => {
        cy.loadStory('Components/Header/HeaderMobileGroup', 'Default')
        cy.checkAccessibility()
    })
})

export {}
