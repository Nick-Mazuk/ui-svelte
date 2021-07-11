const content = '[data-test="accordion-content"]'

context('Accordion', () => {
    it('renders', () => {
        cy.loadStory('Components/Accordion', 'Default')
        cy.checkAccessibility()

        cy.get(content).should('exist').should('not.be.visible')
        cy.get('summary').click()
        cy.get(content).should('be.visible')
        cy.get('summary').click()
        cy.get(content).should('exist').should('not.be.visible')

        cy.get('body').realPress('Tab')
        cy.get('summary').should('be.focused')
        cy.realPress(' ')
        cy.get(content).should('be.visible')
        cy.realPress(' ')
        cy.get(content).should('exist').should('not.be.visible')
    })
})

export {}
