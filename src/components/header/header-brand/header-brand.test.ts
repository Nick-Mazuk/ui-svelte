it('can customize text', () => {
    const text = 'hello'
    cy.loadStory('Components/Header/HeaderBrand', 'Default', {
        text,
    })

    cy.get('p').contains(text).should('be.visible')
})

it('responds to breakpoints', () => {
    cy.loadStory('Components/Header/HeaderBrand', 'Breakpoints')

    cy.get('img:visible').should('have.length', 3).should('be.visible')
    cy.get('p').contains("breakpoint='none'").should('be.visible')
    cy.get('p').contains("breakpoint='sm'").should('be.visible')
    cy.get('p').contains("breakpoint='md'").should('be.visible')
    cy.checkAccessibility()

    cy.screenSize('md')
    cy.get('img:visible').should('have.length', 3).should('be.visible')
    cy.get('p').contains("breakpoint='none'").should('be.visible')
    cy.get('p').contains("breakpoint='sm'").should('be.visible')
    cy.get('p').contains("breakpoint='md'").should('not.be.visible')
    cy.checkAccessibility()

    cy.screenSize('sm')
    cy.get('img:visible').should('have.length', 3).should('be.visible')
    cy.get('p').contains("breakpoint='none'").should('be.visible')
    cy.get('p').contains("breakpoint='sm'").should('not.be.visible')
    cy.get('p').contains("breakpoint='md'").should('not.be.visible')
    cy.checkAccessibility()
})

export {}
