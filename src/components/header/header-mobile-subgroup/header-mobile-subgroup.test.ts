context('HeaderMobileSubgroup', () => {
    it('renders', () => {
        cy.loadStory('Components/Header/HeaderMobileSubgroup', 'Default')
        cy.checkAccessibility()
    })
})

export {}
