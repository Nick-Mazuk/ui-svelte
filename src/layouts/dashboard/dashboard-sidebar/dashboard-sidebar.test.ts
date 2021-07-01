context('DashboardSidebar', () => {
    it('renders', () => {
        cy.loadStory('Layouts/Dashboard/DashboardSidebar', 'Default')
        cy.checkAccessibility()
        cy.get('[data-test="list-item"]').should('be.visible').should('have.length', 3)
        cy.get('select').should('not.be.visible')

        cy.screenSize('lg')
        cy.get('[data-test="list-item"]').should('be.visible').should('have.length', 3)
        cy.get('select').should('not.be.visible')

        cy.screenSize('md')
        cy.get('[data-test="list-item"]').should('not.be.visible')
        cy.get('select').should('be.visible')

        cy.screenSize('sm')
        cy.get('[data-test="list-item"]').should('not.be.visible')
        cy.get('select').should('be.visible')
    })
})

export {}
