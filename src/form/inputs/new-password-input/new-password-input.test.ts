context('NewPasswordInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/NewPasswordInput', 'Default')
        cy.get('input').should('have.attr', 'type', 'password')
        cy.get('button').click()
        cy.get('input').should('have.attr', 'type', 'text')
        cy.contains('Hide password')
        cy.get('button').click()
        cy.get('input').should('have.attr', 'type', 'password')
        cy.contains('Show password')

        cy.contains('Very weak')

        cy.get('input').type('weak').blur()
        cy.contains('Weak')
        cy.get('[data-test="error"]').should('exist')
        cy.contains('Parsed value: "weak"')

        cy.get('input').clear().type('okpassw').blur()
        cy.contains('So-so')
        cy.get('[data-test="error"]').should('exist')
        cy.contains('Parsed value: "okpassw"')

        cy.get('input').clear().type('we$aker123').blur()
        cy.contains('Good')
        cy.get('[data-test="error"]').should('not.exist')
        cy.contains('Parsed value: "we$aker123"')

        cy.get('input').clear().type('weakwe$aker123').blur()
        cy.contains('Great!')
        cy.get('[data-test="error"]').should('not.exist')
        cy.contains('Parsed value: "weakwe$aker123"')
    })
})

export {}
