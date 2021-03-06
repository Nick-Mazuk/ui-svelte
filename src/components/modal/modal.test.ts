context('Modal', () => {
    it('renders', () => {
        cy.loadStory('Components/Modal', 'Default')
        cy.get('button').click()
        cy.get('#modal-title').contains('Title')
        cy.contains('This is the contents of the modal.')
        cy.get('button').contains('Cancel')
        cy.get('button').contains('Confirm')
        cy.get('button').contains('Cancel').click()
        cy.get('[data-test="modal"]').should('not.exist')
        cy.loadStory('Components/Modal', 'Default', {
            description: '',
        })
        cy.get('button').click()
        cy.get('#modal-description').should('not.exist')
        cy.get('[data-test="modal"').should('not.have.attr', 'aria-describedby')
    })
    it('is accessible', () => {
        cy.loadStory('Components/Modal', 'Default', {
            title: 'Modal title',
        })
        cy.get('[data-test="modal"]').should('not.exist')
        cy.tab().realPress(' ')
        cy.get('[data-test="modal"]')
            .should('exist')
            .should('have.attr', 'role', 'alertdialog')
            .should('have.attr', 'aria-labelledby', 'modal-title')
            .should('have.attr', 'aria-describedby', 'modal-description')
            .should('be.focused')
        cy.checkAccessibility()
        cy.get('#modal-title').contains('Modal title')
        cy.get('#modal-description').contains('Would you like to continue?')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.get(':focused').should('have.attr', 'aria-label', 'Close modal')
        cy.realPress(['Shift', 'Tab'])
        cy.get(':focused').contains('Confirm')
        cy.realPress('Escape')
        cy.get('[data-test="modal"]').should('not.exist')
        cy.get('button').should('be.focused').click()
        cy.get('[data-test="modal"]').should('exist')
        cy.get('[data-test="modal"] [aria-label="Close modal"]').click()
        cy.get('[data-test="modal"]').should('not.exist')
    })
})

export {}
