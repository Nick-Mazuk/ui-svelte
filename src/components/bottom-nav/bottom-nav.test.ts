context('BottomNav', () => {
    it('renders', () => {
        cy.loadStory('Components/BottomNav', 'Default')
        cy.checkAccessibility()
    })
})

export {}
