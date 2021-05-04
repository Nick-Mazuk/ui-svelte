const tab = '[data-test="tab-item"]'

it('functions correctly', () => {
    cy.loadStory('Navigation/Tabs', 'Default')
    cy.checkAccessibility()

    cy.get(tab)
        .first()
        .should('have.attr', 'aria-selected', 'true')
        .should('have.attr', 'tabindex', '0')
    cy.get(`${tab}:not(:first-of-type)`)
        .should('have.attr', 'aria-selected', 'false')
        .should('have.attr', 'tabindex', '-1')

    // works with mouse
    cy.get(`${tab}:nth-of-type(2)`)
        .click()
        .should('have.attr', 'aria-selected', 'true')
        .should('have.attr', 'tabindex', '0')
    cy.get(`${tab}:nth-of-type(3)`).click().should('have.attr', 'aria-selected', 'true')
    cy.get(`${tab}:nth-of-type(1)`).click().should('have.attr', 'aria-selected', 'true')

    // works with keyboard
    cy.get('body').click().tab()
    cy.realPress('ArrowRight')
    cy.realType(' ')
    cy.get(`${tab}:nth-of-type(2)`).should('have.attr', 'aria-selected', 'true')
    cy.realPress('ArrowRight')
    cy.realType(' ')
    cy.get(`${tab}:nth-of-type(3)`).should('have.attr', 'aria-selected', 'true')

    cy.realPress('ArrowRight')
    cy.realType(' ')
    cy.get(`${tab}:nth-of-type(1)`).should('have.attr', 'aria-selected', 'true')

    cy.realPress('ArrowLeft')
    cy.realType(' ')
    cy.get(`${tab}:nth-of-type(3)`).should('have.attr', 'aria-selected', 'true')

    cy.realPress('Home')
    cy.realType(' ')
    cy.get(`${tab}:nth-of-type(1)`).should('have.attr', 'aria-selected', 'true')
    cy.realPress('End')
    cy.realType(' ')
    cy.get(`${tab}:nth-of-type(3)`).should('have.attr', 'aria-selected', 'true')
})

it('can be disabled', () => {
    cy.loadStory('Navigation/Tabs', 'Disabled')
    cy.checkAccessibility()
    cy.get('button').should('be.disabled').should('have.attr', 'tabindex', '-1')
})

export {}
