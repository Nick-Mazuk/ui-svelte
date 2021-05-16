context('Subheader', () => {
    it('renders', () => {
        cy.loadStory('Components/Header/Subheader', 'Default')
        cy.checkAccessibility()
    })
})

export {}
