context('MarketingIcon', () => {
    it('renders', () => {
        cy.loadStory('Elements/MarketingIcon', 'Default')
        cy.checkAccessibility()
    })
})

export {}
