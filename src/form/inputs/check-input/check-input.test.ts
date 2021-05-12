// eslint-disable-next-line max-lines-per-function -- all tests are short
context('CheckInput', () => {
    it('functions correctly', () => {
        cy.loadStory('Form/Inputs/CheckInput', 'Default')
        cy.checkAccessibility()
        cy.get('[data-test="error"]').should('not.exist')
        cy.get('label')
            .get('input[type="checkbox"]')
            .should('not.be.checked')
            .click()
            .should('be.checked')
            .click()
            .should('not.be.checked')
        cy.get('[data-test="error"]').should('exist')
        cy.checkAccessibility()
        cy.get('input[type="checkbox"]').should('have.attr', 'aria-invalid', 'true').click()
        cy.get('[data-test="error"]').should('not.exist')
        cy.checkAccessibility()
        cy.get('[data-test="check-input-description"]').click()
        cy.get('input[type="checkbox"]').should('not.be.checked')
    })

    it('has correct states', () => {
        cy.loadStory('Form/Inputs/CheckInput', 'Default', {
            defaultValue: 'checked',
            label: 'Label',
            name: 'my-check-name',
            ariaLabel: 'aria-label',
            optional: 'true',
        })
        cy.get('input[type="checkbox"]')
            .should('be.checked')
            .should('have.attr', 'name', 'my-check-name')
            .should('have.attr', 'aria-label', 'aria-label')
        cy.contains('Label')
            .click()
            .get('input[type="checkbox"]')
            .should('not.be.checked')
            .should('not.have.attr', 'aria-invalid', 'true')
        cy.get('[data-test="error"]').should('not.exist')
        cy.contains('optional')
        cy.checkAccessibility()

        cy.loadStory('Form/Inputs/CheckInput', 'Default', {
            optional: 'true',
            hideOptionalLabel: 'true',
        })
        cy.contains('optional').should('not.exist')

        cy.loadStory('Form/Inputs/CheckInput', 'Default', {
            hideError: 'true',
        })
        cy.get('input[type="checkbox"]').click().click().should('have.attr', 'aria-invalid', 'true')
        cy.get('[data-test="error"]').should('not.exist')

        cy.loadStory('Form/Inputs/CheckInput', 'Default', {
            requiredMessage: 'Custom required message',
        })
        cy.get('input[type="checkbox"]').click().click().should('have.attr', 'aria-invalid', 'true')
        cy.get('[data-test="error"]').contains('Custom required message').should('exist')

        cy.loadStory('Form/Inputs/CheckInput', 'Disabled')
        cy.get('input[type="checkbox"]').should('be.disabled')
        cy.checkAccessibility()

        cy.loadStory('Form/Inputs/CheckInput', 'No text')
        cy.checkAccessibility()
    })
})
export {}
