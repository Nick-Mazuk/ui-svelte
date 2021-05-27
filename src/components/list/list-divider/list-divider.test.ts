context('ListDivider', () => {
    it('renders', () => {
        cy.loadStory('Components/List/ListDivider', 'Default')
        cy.checkAccessibility()
    })
})

export {}
