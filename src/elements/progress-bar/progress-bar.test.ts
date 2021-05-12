context('ProgressBar', () => {
    it('renders', () => {
        cy.loadStory('Elements/ProgressBar', 'Default', {
            value: '40',
            max: '50',
        })
        cy.checkAccessibility()
        cy.get('[role="progressbar"]')
            .should('have.attr', 'aria-valuenow', '40')
            .should('have.attr', 'aria-valuemax', '50')
            .should('have.attr', 'aria-valuemin', '0')
        cy.get('[style="width: 80%"]').should('exist')

        cy.loadStory('Elements/ProgressBar', 'Default', {
            value: '100',
            max: '50',
        })
        cy.get('[role="progressbar"]')
            .should('have.attr', 'aria-valuenow', '50')
            .should('have.attr', 'aria-valuemax', '50')
            .should('have.attr', 'aria-valuemin', '0')
        cy.get('[style="width: 100%"]').should('exist')

        cy.loadStory('Elements/ProgressBar', 'Default', {
            value: '-100',
            max: '50',
        })
        cy.get('[role="progressbar"]')
            .should('have.attr', 'aria-valuenow', '0')
            .should('have.attr', 'aria-valuemax', '50')
            .should('have.attr', 'aria-valuemin', '0')
        cy.get('[style="width: 0%"]').should('exist')
    })
})

export {}
