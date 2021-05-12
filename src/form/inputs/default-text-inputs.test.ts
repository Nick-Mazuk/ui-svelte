import type { TextInputAutocomplete } from './text-input'
import type { TextInputType } from './text-input/index.d'

type Input = {
    componentName: string
    type: TextInputType
    name: string
    label: string
    validValue: string
    invalidValue: string
    parsedValue: string
    hasIcon: boolean
    requiredMessage?: string
    autocomplete?: TextInputAutocomplete
    minCharacters?: boolean
    maxCharacters?: boolean
}

const inputs: Input[] = [
    {
        componentName: 'EmailInput',
        type: 'email',
        name: 'email',
        label: 'Email',
        validValue: 'HEllo@gmail.com',
        parsedValue: 'hello@gmail.com',
        invalidValue: 'invalid',
        hasIcon: true,
        requiredMessage: 'Enter your email',
        autocomplete: 'email',
    },
]

inputs.forEach((input) => {
    it(`${input.componentName} functions correctly`, () => {
        cy.loadStory(`Form/Inputs/${input.componentName}`, 'Default')
        cy.checkAccessibility()
        if (input.hasIcon) cy.get('svg')
        cy.contains(input.label)
        cy.get('input')
            .should('have.attr', 'type', input.type)
            .should('have.attr', 'name', input.name)
            .should('have.attr', 'required')
        if (input.autocomplete) cy.get('input').should('have.attr', 'autocomplete', 'email')
        cy.get('input').should('not.have.attr', 'readonly')
        cy.get('input').should('not.be.disabled')

        cy.get('input').focus().blur()
        if (input.requiredMessage) cy.get('[data-test="error"]').contains(input.requiredMessage)
        cy.get('input').type(input.validValue).should('have.value', input.validValue)
        cy.get('[data-test="error"]').should('not.exist')
        cy.contains(`Parsed value: "${input.parsedValue}"`)
        cy.get('input').clear().type(input.invalidValue).blur()
        cy.get('[data-test="error"]')
    })
})

inputs.forEach((input) => {
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
        cy.get('svg').should('not.exist')
        cy.contains('Custom label')
        cy.get('input').should('have.attr', 'name', 'custom-name')
        cy.get('input').should('have.attr', 'autocomplete', 'off')
        cy.get('input').should('not.have.attr', 'required')
        cy.get('input').should('have.attr', 'readonly')
        cy.get('input').should('not.be.disabled')
        cy.get('input').should('have.attr', 'placeholder', 'Custom placeholder')
        cy.get('input').should('have.value', 'Custom value')
        cy.get('input').should('have.attr', 'autofocus')
        if (input.maxCharacters) cy.contains('8 / 100')
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

export {}
