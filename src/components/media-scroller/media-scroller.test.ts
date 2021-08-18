context('MediaScroller', () => {
    it('renders', () => {
        cy.loadStory('Components/MediaScroller', 'Default')
        cy.checkAccessibility()
    })
})

export {}
