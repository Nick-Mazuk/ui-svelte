context('Changelog', () => {
    it('renders', () => {
        cy.loadStory('Layouts/Changelog', 'Default')
        cy.checkAccessibility({ page: true })
    })
})

export {}
