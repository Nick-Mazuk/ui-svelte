context('PasswordInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/PasswordInput', 'Default')
        cy.get('input').should('have.attr', 'type', 'password')
        cy.get('button').click()
        cy.get('input').should('have.attr', 'type', 'text')
        cy.contains('Hide password')
        cy.get('button').click()
        cy.get('input').should('have.attr', 'type', 'password')
        cy.contains('Show password')
    })
})

export {}
