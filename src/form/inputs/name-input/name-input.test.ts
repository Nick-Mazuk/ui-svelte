context('NameInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/NameInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
