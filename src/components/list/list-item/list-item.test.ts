context('ListItem', () => {
    it('renders', () => {
        cy.loadStory('Components/List/ListItem', 'Default')
        cy.checkAccessibility()
    })
})

export {}
