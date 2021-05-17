context('FileInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/FileInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
