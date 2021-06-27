context('BottomNavItem', () => {
    it('renders', () => {
        cy.loadStory('Components/Bottom Nav/BottomNavItem', 'Default')
        cy.checkAccessibility()
    })
})

export {}
