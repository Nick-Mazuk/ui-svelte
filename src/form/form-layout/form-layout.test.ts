context('FormLayout', () => {
    it('renders', () => {
        cy.loadStory('Form/FormLayout', 'Default')
        cy.checkAccessibility()
    })
})

export {}
