context('Oauth', () => {
    it('renders', () => {
        cy.loadStory('Layouts/Auth/Oauth', 'Default')
        cy.checkAccessibility()
    })
})

export {}
