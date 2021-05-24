context('ChangelogItemPage', () => {
    it('renders', () => {
        cy.loadStory('Layouts/Changelog/ChangelogItemPage', 'Default')
        cy.checkAccessibility({ page: true })
    })
})

export {}
