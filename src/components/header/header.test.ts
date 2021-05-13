context('Header', () => {
    it('functions', () => {
        cy.loadStory('Components/Header', 'Default')
        cy.checkAccessibility()
    })

    it('works on mobile', () => {
        cy.loadStory('Components/Header', 'Default')
        cy.screenSize('lg')

        // base case before mobile nav is open
        cy.checkAccessibility()
        cy.get('[data-test="header-hamburger"]').should('not.be.visible')
        cy.screenSize('sm')
        cy.get('[data-test="mobile-nav"]').should('not.exist')

        // open mobile nav
        cy.get('[data-test="header-hamburger"]')
            .should('be.visible')
            .should('have.attr', 'aria-label', 'Open menu')
            .click()
            .should('have.attr', 'aria-label', 'Close menu')
        cy.checkAccessibility()
        cy.get('[data-test="mobile-nav"]').should('be.visible')

        // check open nav on larger screen sizes
        cy.screenSize('lg')
        cy.checkAccessibility()
        cy.get('[data-test="mobile-nav"]').should('exist').should('not.be.visible')
        cy.screenSize('sm')
        cy.get('[data-test="mobile-nav"]').should('be.visible')

        // close nav
        cy.get('[data-test="header-hamburger"]')
            .click()
            .should('have.attr', 'aria-label', 'Open menu')
        cy.get('[data-test="mobile-nav"]').should('not.exist')

        // can use keyboard
        cy.get('[data-test="header-hamburger"]').focus().realPress(' ')
        cy.get('[data-test="mobile-nav"]').should('be.visible')
        cy.realPress(' ')
        cy.get('[data-test="mobile-nav"]').should('not.exist')
    })
})

export {}
