context('Modal', () => {
    it('renders', () => {
        cy.loadStory('Components/Modal/ModalSuccess', 'Default')
        cy.get('button').click()
        cy.get('#modal-title').contains('Title')
        cy.get('[data-test="modal"').should('not.have.attr', 'aria-describedby')
        cy.get('[data-test="modal"] [aria-label="Close modal"]').should('not.exist')
        cy.get('button').contains('Confirm').click()
        cy.get('[data-test="modal"]').should('not.exist')
        cy.loadStory('Components/Modal/ModalSuccess', 'Default', {
            description: 'This is a description',
        })
        cy.get('button').click()
        cy.get('#modal-description').contains('This is a description')
    })
    it('is accessible', () => {
        cy.loadStory('Components/Modal/ModalSuccess', 'Default', {
            title: 'Modal title',
            description: 'This is a description',
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
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.get(':focused').contains('Confirm')
        cy.realPress(['Shift', 'Tab'])
        cy.get(':focused').contains('Confirm')
        cy.realPress('Escape')
        cy.get('[data-test="modal"]').should('not.exist')
        cy.get('button').should('be.focused')
    })
})

export {}
