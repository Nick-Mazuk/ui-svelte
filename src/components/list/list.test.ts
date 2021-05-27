/* eslint-disable max-lines-per-function -- individual tests are short */
const listItem = '[data-test="list-item"]'

context('List', () => {
    it('responds to keyboard input', () => {
        cy.loadStory('Components/List', 'Default')
        cy.checkAccessibility()
        cy.get(listItem).first().should('have.attr', 'tabindex', '0')
        cy.get(listItem).eq(1).should('have.attr', 'tabindex', '-1')
        cy.get(listItem).eq(2).should('have.attr', 'tabindex', '-1')
        cy.get(listItem)
            .should('have.attr', 'aria-selected', 'false')
            .should('have.attr', 'data-focused', 'false')

        // can tab to focus the list, then use arrow keys to move focus, then space to select
        cy.tab()
        cy.get(listItem).first().should('be.focused').should('have.attr', 'data-focused', 'true')
        cy.realPress('ArrowDown')
        cy.realPress('ArrowDown')
        cy.realPress('ArrowDown')
        cy.realPress('ArrowUp')
        cy.realPress(' ')
        cy.get(listItem).eq(1).should('have.attr', 'aria-selected', 'true')
        cy.get(listItem).eq(1).should('have.attr', 'data-focused', 'true')
        cy.get(listItem).not('[data-focused="true"]').should('have.attr', 'tabindex', '-1')
        cy.get(listItem).eq(1).should('have.attr', 'tabindex', '0')
        cy.checkAccessibility()

        // arrow keys don't wrap + keep focus on extreme items
        cy.realPress('ArrowUp')
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')
        cy.realPress('ArrowUp')
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')
        cy.realPress('ArrowDown')
        cy.realPress('ArrowDown')
        cy.get(listItem).last().should('have.attr', 'data-focused', 'true')
        cy.realPress('ArrowDown')
        cy.get(listItem).last().should('have.attr', 'data-focused', 'true')

        // test home and end keys
        cy.realPress('Home')
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')
        cy.realPress('End')
        cy.get(listItem).last().should('have.attr', 'data-focused', 'true')

        // can wrap focus
        cy.loadStory('Components/List', 'Default', {
            rotateFocus: 'true',
        })
        cy.tab()
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')
        cy.realPress('ArrowUp')
        cy.get(listItem).last().should('have.attr', 'data-focused', 'true')
        cy.realPress('ArrowDown')
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')
    })
    it.only('works with mouse', () => {
        cy.loadStory('Components/List', 'Default')
        cy.get(listItem).first().realHover()
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')

        // if the list doesn't have focus but an item is hovered, arrow keys don't work
        cy.realPress('ArrowDown')
        cy.get(listItem).eq(0).should('have.attr', 'data-focused', 'true')
        cy.get(listItem).eq(1).should('not.have.attr', 'data-focused', 'true')

        // clicking both focused and selects the item
        cy.get(listItem).first().realClick()
        cy.get(listItem)
            .first()
            .should('have.attr', 'data-focused', 'true')
            .should('have.attr', 'aria-selected', 'true')
        cy.get(listItem).eq(1).realHover()
        cy.get(listItem).first().should('have.attr', 'aria-selected', 'true')
        cy.get(listItem).eq(1).should('have.attr', 'data-focused', 'true')

        // using arrow keys when an item is hovered and actually DOM focused moves visual focus
        cy.realPress('ArrowDown')
        cy.get(listItem).eq(2).should('have.attr', 'data-focused', 'true')
    })
    it.only('non-interactive mode works', () => {
        cy.loadStory('Components/List', 'Default', {
            mode: 'nonInteractive',
        })
        cy.get(listItem).should('not.have.attr', 'tabindex')
        cy.tab()
        cy.get(listItem).should('not.be.focused')
    })
})

export {}
