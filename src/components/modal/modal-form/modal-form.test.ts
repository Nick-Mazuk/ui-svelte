context('Modal', () => {
    it('renders', () => {
        cy.loadStory('Components/Modal/ModalForm', 'Default')
        cy.get('button').click()
        cy.get('#title-form-title').contains('Title')
        cy.get('input')
        cy.get('button').contains('Save').click()
        cy.get('[data-test="modal"]').should('not.exist')
        cy.loadStory('Components/Modal/ModalForm', 'Default', {
            description: '',
        })
        cy.get('button').click()
        cy.get('#modal-description').should('not.exist')
        cy.get('[data-test="modal"').should('not.have.attr', 'aria-describedby')
    })
    it('is accessible', () => {
        cy.loadStory('Components/Modal/ModalForm', 'Default', {
            title: 'Modal title',
            description: 'This is a description',
        })
        cy.get('[data-test="modal"]').should('not.exist')
        cy.tab().realPress(' ')
        cy.get('[data-test="modal"]')
            .should('exist')
            .should('have.attr', 'role', 'alertdialog')
            .should('have.attr', 'aria-labelledby', 'modal-title-form-title')
            .should('have.attr', 'aria-describedby', 'modal-title-form-description')
            .should('be.focused')
        cy.checkAccessibility()
        cy.get('#modal-title-form-title').contains('Modal title')
        cy.get('#modal-title-form-description').contains('This is a description')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.get(':focused').should('have.attr', 'aria-label', 'Close modal')
        cy.realPress(['Shift', 'Tab'])
        cy.get(':focused').contains('Save')
        cy.realPress('Escape')
        cy.get('[data-test="modal"]').should('not.exist')
        cy.get('button').should('be.focused').click()
        cy.get('[data-test="modal"]').should('exist')
        cy.get('[data-test="modal"] [aria-label="Close modal"]').click()
        cy.get('[data-test="modal"]').should('not.exist')
    })
})

export {}
