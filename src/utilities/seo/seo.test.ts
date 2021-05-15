context('Seo', () => {
    it('renders', () => {
        cy.loadStory('Utilities/Seo', 'Default')
        cy.checkAccessibility()
    })
})

export {}
