/* eslint-disable max-lines-per-function -- individual tests are short */
const listItem = '[data-test="list-item"]'
const list = '[data-test="list"]'

context('List', () => {
    it('responds to keyboard input', () => {
        cy.loadStory('Components/List', 'Default')
        cy.checkAccessibility()
        cy.get(listItem).first().should('have.attr', 'tabindex', '0')
        cy.get(listItem).eq(1).should('have.attr', 'tabindex', '-1')
        cy.get(listItem).eq(2).should('have.attr', 'tabindex', '-1')
        cy.get(listItem).should('not.have.attr', 'aria-selected')
        cy.get(listItem).should('have.attr', 'data-focused', 'false')

        // can tab to focus the list, then use arrow keys to move focus, then space to select
        cy.tab()
        cy.get(listItem).first().should('be.focused').should('have.attr', 'data-focused', 'true')
        cy.realPress('ArrowDown')
        cy.realPress('ArrowDown')
        cy.realPress('ArrowDown')
        cy.realPress('ArrowUp')

        cy.get(listItem).eq(1).should('have.attr', 'data-focused', 'true')

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

        // cannot select an item
        cy.realPress(' ')
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')
        cy.get(listItem).first().should('not.have.attr', 'aria-selected')
    })
    it('works with mouse', () => {
        cy.loadStory('Components/List', 'Default')
        cy.get(listItem).first().realHover()
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')

        // if the list doesn't have focus but an item is hovered, arrow keys don't work
        cy.realPress('ArrowDown')
        cy.get(listItem).eq(0).should('have.attr', 'data-focused', 'true')
        cy.get(listItem).eq(1).should('not.have.attr', 'data-focused', 'true')

        // clicking doesn't select an element
        cy.get(listItem).first().realHover()
        cy.get(listItem).first().click()
        cy.get(listItem).first().should('have.attr', 'data-focused', 'true')
        cy.get(listItem).first().should('not.have.attr', 'aria-selected')
    })
    it('works with alternate modes', () => {
        cy.loadStory('Components/List', 'Default', {
            mode: 'display',
        })
        cy.get(list).should('have.attr', 'role', 'list')
        cy.get(listItem).should('have.attr', 'role', 'listitem')
        cy.get(listItem).should('not.have.attr', 'tabindex')
        cy.realPress('Tab')
        cy.get(listItem).should('not.be.focused')
        cy.get(listItem).first().realHover()
        cy.get(listItem).first().should('have.attr', 'data-focused', 'false')
        cy.get(listItem).first().click()
        cy.get(listItem).first().should('not.have.attr', 'aria-selected')

        cy.loadStory('Components/List', 'Default', {
            mode: 'singleSelect',
        })
        cy.get(list).should('have.attr', 'role', 'listbox')
        cy.get(listItem).should('have.attr', 'role', 'option')

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
        cy.get(listItem).first().should('have.attr', 'aria-selected', 'true')
        cy.realPress(' ')
        cy.get(listItem).eq(2).should('have.attr', 'data-focused', 'true')
        cy.get(listItem).eq(2).should('have.attr', 'aria-selected', 'true')
        cy.get(listItem).eq(2).should('have.attr', 'tabindex', '0')
        cy.get(listItem).not('[data-focused="true"]').should('have.attr', 'tabindex', '-1')
        cy.checkAccessibility()
    })
    it('works with autofocus', () => {
        cy.loadStory('Components/List', 'Default', {
            autofocus: 'true',
        })
        cy.get(list).should('be.focused')
        cy.get(listItem).should('have.length', 3)

        cy.realPress('ArrowDown')
        cy.get('[data-focused="true"]')
    })
    it('has correct aria-roles', () => {
        cy.loadStory('Components/List', 'Default', {
            role: 'list',
        })
        cy.get(list).should('have.attr', 'role', 'list')
        cy.get(listItem).should('have.attr', 'role', 'listitem')
        cy.checkAccessibility()

        cy.loadStory('Components/List', 'Default', {
            role: 'listbox',
        })
        cy.get(list).should('have.attr', 'role', 'listbox')
        cy.get(listItem).should('have.attr', 'role', 'option')
        cy.checkAccessibility()

        cy.loadStory('Components/List', 'Default', {
            role: 'menu',
        })
        cy.get(list).should('have.attr', 'role', 'menu')
        cy.get(listItem).should('have.attr', 'role', 'menuitem')
        cy.checkAccessibility()
    })
})

export {}
