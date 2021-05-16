context('Modal', () => {
    it('renders', () => {
        cy.loadStory('Components/Modal', 'Default')
        cy.checkAccessibility()
    })
})

export {}
