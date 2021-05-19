const invalidUrls = [
    'john smith',
    'hello@example.com',
    'foo@bar.com',
    'http://localhost:3000/',
    '//foobar.com',
]

const validUrls = [
    'https://example.com',
    'http://facebook.com/this.is.a.path',
    'foobar.com',
    'www.foobar.com',
    'foobar.com/',
    'valid.au',
]

context('UrlInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/UrlInput', 'Default', {
            optional: 'true',
        })

        invalidUrls.forEach((value) => {
            cy.get('input').type(value).blur()
            cy.get('[data-test="error"]').should('exist')
            cy.get('input').clear().blur()
            cy.get('[data-test="error"]').should('not.exist')
        })
        validUrls.forEach((value) => {
            cy.get('input').type(value).blur()
            cy.get('[data-test="error"]').should('not.exist')
            cy.contains(`Parsed value: "${value}"`)
            cy.get('input').clear()
        })
    })
})

export {}
