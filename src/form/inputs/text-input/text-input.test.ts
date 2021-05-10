// on reset, defaultValue is also reset

it('has basic functionality', () => {
    cy.loadStory('Form/Inputs/TextInput', 'Default')
    cy.checkAccessibility()
    cy.get('label')
        .get('input')
        .type('Hello world')
        .should('have.value', 'Hello world')
        .type('{backspace}{backspace}{backspace}')
        .should('have.value', 'Hello wo')
        .blur()
    cy.get('[data-test="error"]').should('not.exist')
    cy.contains('Label').click()
    cy.get('input').should('be.focused').clear().blur()
    cy.get('[data-test="error"]').should('exist')
    cy.get('input').type('a')
    cy.get('[data-test="error"]').should('not.exist')
})

it('has working display props', () => {
    cy.loadStory('Form/Inputs/TextInput', 'Default', {
        name: 'my-name',
        label: 'My label',
        type: 'email',
        size: 'large',
        placeholder: 'Enter your email',
        defaultValue: 'example',
        prefix: 'prefix',
        suffix: 'suffix',
        helpText: 'Just enter your email already',
        feedback: 'Looks good enough',
        requiredMessage: 'Enter your email',
        keyboard: 'email',
        autocomplete: 'email',
    })
    cy.checkAccessibility()
    cy.get('input')
        .should('have.attr', 'name', 'my-name')
        .should('have.attr', 'type', 'email')
        .should('have.attr', 'placeholder', 'Enter your email')
        .should('have.attr', 'inputmode', 'email')
        .should('have.attr', 'autocomplete', 'email')
        .should('have.value', 'example')

    cy.contains('My label').should('exist')
    cy.contains('suffix').should('exist')
    cy.contains('prefix').should('exist')
    cy.contains('Just enter your email already').should('exist')
    cy.contains('Looks good enough').should('exist')
    cy.get('input').clear().blur()
    cy.get('[data-test="error"]').contains('Enter your email').should('exist')
    cy.checkAccessibility()

    cy.loadStory('Form/Inputs/TextInput', 'States')
    cy.checkAccessibility()
    cy.get('input').eq(0).should('have.attr', 'required')
    cy.get('label').eq(1).contains('optional')
    cy.get('input').eq(1).should('not.have.attr', 'required')
    cy.get('label').eq(2).contains('readonly')
    cy.get('input').eq(2).should('have.attr', 'readonly')
    cy.get('input').eq(3).should('have.attr', 'disabled')

    cy.loadStory('Form/Inputs/TextInput', 'Default', {
        optional: 'true',
        hideOptionalLabel: 'true',
    })
    cy.get('label').contains('optional').should('not.exist')
})

it('affixes work', () => {
    cy.loadStory('Form/Inputs/TextInput', 'Prefix and suffix')
    cy.checkAccessibility()
    cy.get('button').last().realHover()
    cy.get('[data-test="tooltip"]').should('be.visible')
    cy.get('button').last().click()
    cy.on('window:alert', cy.stub().as('alerted'))
    cy.get('[data-test="tooltip"]').should('be.visible')
    cy.get('button').last().blur()
    cy.get('input').first().realHover()
    cy.get('[data-test="tooltip"]').should('not.exist')

    cy.contains('https://').click()
    cy.get('input').first().should('be.focused')
})

it('enforces character limits', () => {
    cy.loadStory('Form/Inputs/TextInput', 'Character limits')
    cy.checkAccessibility()

    const string = 'aaaaaaaaaaaaaaa'
    cy.contains('0 / 30')
    cy.get('input').first().type(string)
    cy.contains('15 / 30')
    cy.get('input').first().type(string)
    cy.contains('30 / 30')
    cy.get('input')
        .first()
        .type('a')
        .should('have.value', string + string)
    cy.contains('30 / 30')

    cy.contains('0 characters (minimum 8)')
    cy.get('input').eq(1).focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.get('[data-test="error"]').should('exist')
    cy.get('input').eq(1).type('aaaaaaaa').should('not.have.attr', 'aria-invalid', 'true')
    cy.get('[data-test="error"]').should('not.exist')
    cy.contains('8 characters (minimum 8)')
})

it('formats and parses input correctly', () => {
    cy.loadStory('Form/Inputs/TextInput', 'Formatters')
    cy.checkAccessibility()

    cy.get('input').focus().realType('0{backspace}')
    cy.contains('Value: "150.00"')
    cy.contains('Parsed value: "150"')

    cy.get('input').focus().realType('{backspace}{backspace}')
    cy.get('input').should('have.value', '150.')
    cy.contains('Value: "150."')
    cy.contains('Parsed value: "150"')

    cy.get('input').blur().should('have.value', '150')
    cy.contains('Value: "150"')
    cy.contains('Parsed value: "150"')

    cy.get('input').focus()
    cy.realPress('ArrowLeft')
    cy.realPress('ArrowLeft')
    cy.realPress('ArrowLeft')
    cy.realType('abc123')

    cy.get('input').should('have.value', '123,150')
    cy.contains('Value: "123,150"')
    cy.contains('Parsed value: "123150"')
})

it('works with form', () => {
    cy.loadStory('Form/Inputs/TextInput', 'With form')
    cy.checkAccessibility()
    cy.get('button').click()
    cy.get('input')
        .should('have.attr', 'aria-invalid', 'true')
        .type('hello')
        .should('have.value', 'hello')
    cy.get('button').click()
    cy.get('input').should('have.value', '')

    cy.loadStory('Form/Inputs/TextInput', 'With form', {
        defaultValue: 'hello',
    })
    cy.get('input').type(' hello').should('have.value', 'hello hello')
    cy.get('button').click()
    cy.get('input').should('have.value', 'hello')
})

export {}
