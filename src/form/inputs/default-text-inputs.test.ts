import type { TextInputAutocomplete, TextInputKeyboard } from './text-input'
import type { TextInputType } from './text-input/index.d'

type Input = {
    componentName: string
    type: TextInputType
    name: string
    label: string
    validValue: string
    invalidValue?: string
    parsedValue?: string
    hasIcon?: boolean
    requiredMessage?: string
    keyboard?: TextInputKeyboard
    autocomplete?: TextInputAutocomplete
    minCharacters?: boolean
    maxCharacters?: boolean
}

const inputs: Input[] = [
    {
        componentName: 'DateInput',
        type: 'text',
        name: 'date',
        label: 'Date',
        validValue: 'March 2, 2021',
        invalidValue: 'gibberjabber',
        hasIcon: true,
        requiredMessage: 'Enter a date',
    },
    {
        componentName: 'EmailInput',
        type: 'email',
        name: 'email',
        label: 'Email',
        validValue: 'HEllo@gmail.com',
        parsedValue: 'hello@gmail.com',
        invalidValue: 'invalid',
        hasIcon: true,
        keyboard: 'email',
        requiredMessage: 'Enter your email',
        autocomplete: 'email',
        maxCharacters: true,
    },
    {
        componentName: 'NewPasswordInput',
        type: 'password',
        name: 'password',
        label: 'Password',
        validValue: 'this is my super secure password',
        parsedValue: 'this is my super secure password',
        invalidValue: 'invalid',
        hasIcon: true,
        requiredMessage: 'Enter your password',
        autocomplete: 'new-password',
    },
    {
        componentName: 'NumberInput',
        type: 'text',
        name: 'number',
        label: 'Number',
        validValue: '123',
        parsedValue: '123',
        keyboard: 'decimal',
        requiredMessage: 'Enter a number',
    },
    {
        componentName: 'PasswordInput',
        type: 'password',
        name: 'password',
        label: 'Password',
        validValue: 'password',
        parsedValue: 'password',
        hasIcon: true,
        requiredMessage: 'Enter your password',
        autocomplete: 'current-password',
    },
    {
        componentName: 'UrlInput',
        type: 'url',
        name: 'url',
        label: 'Url',
        validValue: 'https://example.com',
        invalidValue: 'not a url',
        parsedValue: 'https://example.com',
        hasIcon: true,
        keyboard: 'url',
        requiredMessage: 'Enter a url',
    },
]

// eslint-disable-next-line max-lines-per-function -- has multiple shorter tests
inputs.forEach((input) => {
    // eslint-disable-next-line max-lines-per-function, sonarjs/cognitive-complexity -- has multiple shorter tests
    context(input.componentName, () => {
        it(`${input.componentName} functions correctly`, () => {
            cy.loadStory(`Form/Inputs/${input.componentName}`, 'Default')
            cy.checkAccessibility()
            if (input.hasIcon) cy.get('[data-test="text-input-prefix"]')
            cy.contains(input.label)
            cy.get('input')
                .should('have.attr', 'type', input.type)
                .should('have.attr', 'name', input.name)
                .should('have.attr', 'required')
            if (input.autocomplete)
                cy.get('input').should('have.attr', 'autocomplete', input.autocomplete)
            cy.get('input').should('not.have.attr', 'readonly')
            cy.get('input').should('not.be.disabled')

            cy.get('input').focus().blur()
            if (input.requiredMessage) cy.get('[data-test="error"]').contains(input.requiredMessage)
            cy.get('input').type(input.validValue).should('have.value', input.validValue)
            cy.get('[data-test="error"]').should('not.exist')
            if (input.parsedValue) cy.contains(`Parsed value: "${input.parsedValue}"`)
            if (input.invalidValue) {
                cy.get('input').clear().type(input.invalidValue).blur()
                cy.get('[data-test="error"]')
            }
        })

        it(`${input.componentName} displays props correctly`, () => {
            cy.loadStory(`Form/Inputs/${input.componentName}`, 'Default', {
                label: 'Custom label',
                name: 'custom-name',
                placeholder: 'Custom placeholder',
                helpText: 'Custom help text',
                size: 'large',
                optional: 'true',
                readonly: 'true',
                hideIcon: 'true',
                autocomplete: 'off',
                maxCharacters: '100',
                autofocus: 'true',
                defaultValue: 'Custom value',
            })
            cy.checkAccessibility()
            cy.get('[data-test="text-input-prefix"]').should('not.exist')
            cy.contains('Custom label')
            cy.get('input').should('have.attr', 'name', 'custom-name')
            cy.get('input').should('have.attr', 'autocomplete', 'off')
            cy.get('input').should('not.have.attr', 'required')
            cy.get('input').should('have.attr', 'readonly')
            cy.get('input').should('not.be.disabled')
            cy.get('input').should('have.attr', 'placeholder', 'Custom placeholder')
            cy.get('input').should('have.value', 'Custom value')
            cy.get('input').should('have.attr', 'autofocus')
            if (input.maxCharacters) cy.contains('12 / 100')
            if (input.keyboard) cy.get('input').should('have.attr', 'inputmode', input.keyboard)
            cy.contains('Custom help text')

            cy.loadStory(`Form/Inputs/${input.componentName}`, 'Default', {
                optional: 'true',
                hideOptionalLabel: 'true',
                disabled: 'true',
            })
            cy.checkAccessibility()
            cy.get('input').should('be.disabled')
            cy.get('input').should('not.have.attr', 'required')
            cy.contains('optional').should('not.exist')

            cy.loadStory(`Form/Inputs/${input.componentName}`, 'Default', {
                requiredMessage: 'Custom required message',
            })
            cy.checkAccessibility()
            cy.get('input').focus().blur()
            cy.get('[data-test="error"]').contains('Custom required message')
        })
    })
})

export {}
