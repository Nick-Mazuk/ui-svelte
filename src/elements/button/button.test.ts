context('Button', () => {
    it('is accessible', () => {
        cy.loadStory('Elements/Button', 'Default')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Variants')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Hovered')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Focused')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Sizes')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Shapes')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Width')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Prefix and suffix')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Disabled')
        cy.checkAccessibility()

        cy.loadStory('Elements/Button', 'Loading')
        cy.checkAccessibility()
    })
})

export {}
