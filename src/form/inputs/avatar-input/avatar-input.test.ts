context('AvatarInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/AvatarInput', 'Default')
        cy.checkAccessibility()
    })
})

export {}
