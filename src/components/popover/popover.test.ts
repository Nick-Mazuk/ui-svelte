it('functions correctly', () => {
    cy.loadStory('Components/Popover', 'Default')
    cy.checkAccessibility()

    cy.get('[data-test="popover"]').should('not.exist')
    cy.get('[data-test="button"]').click()
    cy.get('[data-test="popover"]').should('exist')
    cy.checkAccessibility()
    cy.get('body').click()
    cy.get('[data-test="popover"]').should('not.exist')

    cy.tab().realType(' ')
    cy.get('[data-test="popover"]').should('exist')
    cy.tab().realPress('Escape')
    cy.get('[data-test="popover"]').should('not.exist')

    cy.get('[data-test="button"]').should('be.focused')
})

it('calls hooks', () => {
    cy.loadStory('Components/Popover', 'Events')
    cy.checkAccessibility()

    cy.get('[data-test="button"]').click()
    cy.on('window:alert', cy.stub().as('alerted'))
    cy.get('body').click()
    cy.on('window:alert', cy.stub().as('alerted'))
})

export {}
