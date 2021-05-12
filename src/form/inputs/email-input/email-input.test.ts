const validEmail = 'HEllo@gmail.com'
const parsedEmail = 'hello@gmail.com'
const invalidEmail = 'invalid email'

it('functions correctly', () => {
    cy.loadStory('Form/Inputs/EmailInput', 'Default')
    cy.checkAccessibility()
    cy.get('svg')
    cy.contains('Email')
    cy.get('input')
        .should('have.attr', 'type', 'email')
        .should('have.attr', 'name', 'email')
        .should('have.attr', 'autocomplete', 'email')
        .should('have.attr', 'required')
    cy.get('input').should('not.have.attr', 'readonly')
    cy.get('input').should('not.be.disabled')

    cy.get('input').focus().blur()
    cy.get('[data-test="error"]').contains('Enter your email')
    cy.get('input').type(validEmail).should('have.value', validEmail)
    cy.get('[data-test="error"]').should('not.exist')
    cy.contains(`Parsed value: "${parsedEmail}"`)
    cy.get('input').clear().type(invalidEmail).blur()
    cy.get('[data-test="error"]').contains('Email is invalid')
})

it('displays props correctly', () => {
    cy.loadStory('Form/Inputs/EmailInput', 'Default', {
        label: 'Business email',
        name: 'business-email',
        placeholder: 'Placeholder',
        helpText: 'Help text',
        size: 'large',
        optional: 'true',
        readonly: 'true',
        hideIcon: 'true',
        autocomplete: 'off',
        maxCharacters: '100',
        autofocus: 'true',
        defaultValue: 'business',
    })
    cy.get('svg').should('not.exist')
    cy.contains('Business email')
    cy.get('input').should('have.attr', 'name', 'business-email')
    cy.get('input').should('have.attr', 'autocomplete', 'off')
    cy.get('input').should('not.have.attr', 'required')
    cy.get('input').should('have.attr', 'readonly')
    cy.get('input').should('not.be.disabled')
    cy.get('input').should('have.attr', 'placeholder', 'Placeholder')
    cy.get('input').should('have.value', 'business')
    cy.get('input').should('have.attr', 'autofocus')
    cy.contains('8 / 100')
    cy.contains('Help text')

    cy.loadStory('Form/Inputs/EmailInput', 'Default', {
        optional: 'true',
        hideOptionalLabel: 'true',
        disabled: 'true',
    })
    cy.get('input').should('be.disabled')
    cy.get('input').should('not.have.attr', 'required')
    cy.contains('optional').should('not.exist')

    cy.loadStory('Form/Inputs/EmailInput', 'Default', {
        requiredMessage: 'Required',
    })
    cy.get('input').focus().blur()
    cy.get('[data-test="error"]').contains('Required')
})

export {}
