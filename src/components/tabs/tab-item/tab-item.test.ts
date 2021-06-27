context('TabItem', () => {
    it('renders', () => {
        cy.loadStory('Navigation/Tabs/TabItem', 'Default')
        cy.checkAccessibility()
    })
})

export {}
