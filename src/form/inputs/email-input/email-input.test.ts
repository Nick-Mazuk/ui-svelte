context('EmailInput', () => {
    it('can detect invalid emails', () => {
        cy.loadStory('Form/Inputs/EmailInput', 'Default', {
            optional: 'true',
        })
        cy.checkAccessibility()
        const invalidValues = ['invalid', 'invalid@example.']
        invalidValues.forEach((value) => {
            cy.get('input').clear().type(value).blur()
            cy.get('[data-test="error"]').should('exist')
            cy.get('input').clear().blur()
            cy.get('[data-test="error"]').should('not.exist')
        })
    })
})

export {}
