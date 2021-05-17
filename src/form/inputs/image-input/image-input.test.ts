context('ImageInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/ImageInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
