context('YoutubeVideo', () => {
    it('renders', () => {
        cy.loadStory('Components/YoutubeVideo', 'Default')
        cy.checkAccessibility()
    })
})

export {}
