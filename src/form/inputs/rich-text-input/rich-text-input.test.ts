context('RichTextInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/RichTextInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
