context('DashboardSidebar', () => {
    it('renders', () => {
        cy.loadStory('Layouts/Dashboard/DashboardSidebar', 'Default')
        cy.checkAccessibility()
        cy.get('[data-test="dashbar-sidebar-item"]').should('be.visible').should('have.length', 3)

        cy.screenSize('lg')
        cy.get('button').should('not.be.visible')
        cy.get('[data-test="dashbar-sidebar-item"]').should('be.visible').should('have.length', 3)

        cy.screenSize('md')
        cy.get('button').should('be.visible')
        cy.get('[data-test="dashbar-sidebar-item"]').should('not.be.visible')

        cy.screenSize('sm')
        cy.get('button').should('be.visible')
        cy.get('[data-test="dashbar-sidebar-item"]').should('not.be.visible')

        cy.get('button').click()
        cy.get('[data-test="dashbar-sidebar-item"]').should('be.visible').should('have.length', 3)
        cy.screenSize('lg')
        cy.get('[data-test="dashbar-sidebar-item"]').should('be.visible').should('have.length', 3)
        cy.get('button').should('not.be.visible')
        cy.screenSize('sm')

        cy.get('button').click()
        cy.get('[data-test="dashbar-sidebar-item"]').should('not.be.visible')
    })
})

export {}
