const inputs: [string, string, string][] = [
    ['314159', '314,159', '314159'],
    ['hello world', '', 'NaN'],
    ['hello 3.14159', '3.14159', '3.14159'],
    ['hello 3.1@abc 4159', '3.14159', '3.14159'],
    ['hello 3.1@abc 4159', '3.14159', '3.14159'],
    ['3,14,15,9.2131', '314,159.2131', '314159.2131'],
    ['testing1@foo.com', '1', '1'],
    ['1.', '1', '1'],
    ['-1', '-1', '-1'],
    ['hello- 3.14159', '-3.14159', '-3.14159'],
    ['0', '0', '0'],
]

const negativeInputs: [string, string][] = [
    ['-123', '123'],
    ['123', '123'],
]

const lessThanValues: [string, string][] = [
    ['31', '0'],
    ['231.43', '231'],
    ['-231.43', '-500'],
    ['231.43', '-500'],
]

const greaterThanValues: [string, string][] = [
    ['31', '100'],
    ['231.43', '232'],
    ['-231.43', '0'],
    ['231.43', '500'],
]

// eslint-disable-next-line max-lines-per-function -- individual tests are short
context('NumberInput', () => {
    it('displays and parses values correctly', () => {
        cy.loadStory('Form/Inputs/NumberInput', 'Default')

        inputs.forEach(([input, displayValue, parsedValue]) => {
            cy.get('input').clear().type(input).blur()
            cy.get('input').should('have.value', displayValue)
            cy.contains(`Parsed value: "${parsedValue}"`)
        })
    })
    it('truncates decimals', () => {
        cy.loadStory('Form/Inputs/NumberInput', 'Default', {
            maxDecimals: '3',
        })
        cy.get('input').clear().type('3.14159').blur()
        cy.get('input').should('have.value', '3.141')
        cy.contains(`Parsed value: "3.141"`)
    })
    it('if maxDecimals is 0, user cannot type a decimal point', () => {
        cy.loadStory('Form/Inputs/NumberInput', 'Default', {
            maxDecimals: '0',
        })
        cy.get('input').clear().type('1.')
        cy.get('input').should('have.value', '1')
        cy.contains(`Parsed value: "1"`)
    })
    it('formats decimals', () => {
        cy.loadStory('Form/Inputs/NumberInput', 'Default', {
            decimals: '3',
        })
        cy.get('input').clear().type('3.1').blur()
        cy.get('input').should('have.value', '3.100')
        cy.contains(`Parsed value: "3.1"`)
    })
    it('if decimals is 0, user cannot type a decimal point', () => {
        cy.loadStory('Form/Inputs/NumberInput', 'Default', {
            decimals: '0',
        })
        cy.get('input').clear().type('1.')
        cy.get('input').should('have.value', '1')
        cy.contains(`Parsed value: "1"`)
    })
    it('disallows negatives', () => {
        cy.loadStory('Form/Inputs/NumberInput', 'Default', {
            disallowNegatives: 'true',
        })
        negativeInputs.forEach(([input, displayValue]) => {
            cy.get('input').clear().type(input).blur()
            cy.get('input').should('have.value', displayValue)
            cy.contains(`Parsed value: "${displayValue}"`)
        })
    })
    it('max prop works correctly', () => {
        lessThanValues.forEach(([value, max]) => {
            cy.loadStory('Form/Inputs/NumberInput', 'Default', {
                max,
            })
            cy.get('input').type(value).blur()
            cy.get('[data-test="error"]').should('exist')
        })
        greaterThanValues.forEach(([value, max]) => {
            cy.loadStory('Form/Inputs/NumberInput', 'Default', {
                max,
            })
            cy.get('input').type(value).blur()
            cy.get('[data-test="error"]').should('not.exist')
        })
    })
    it('min prop works correctly', () => {
        lessThanValues.forEach(([value, min]) => {
            cy.loadStory('Form/Inputs/NumberInput', 'Default', {
                min,
            })
            cy.get('input').type(value).blur()
            cy.get('[data-test="error"]').should('not.exist')
        })
        greaterThanValues.forEach(([value, min]) => {
            cy.loadStory('Form/Inputs/NumberInput', 'Default', {
                min,
            })
            cy.get('input').type(value).blur()
            cy.get('[data-test="error"]').should('exist')
        })
    })
})

export {}
