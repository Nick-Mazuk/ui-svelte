it('renders', () => {
    cy.visit('/')
    cy.injectAxe()
    cy.checkA11y()
})

export {}
