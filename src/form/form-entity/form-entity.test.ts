import { FORM_FEEDBACK } from '../form-feedback'

const mockApiUrl = 'api'
const errorCodes: [number, string][] = [
    [400, FORM_FEEDBACK.errors[400]],
    [403, FORM_FEEDBACK.errors[403]],
    [429, FORM_FEEDBACK.errors[429]],
    [500, FORM_FEEDBACK.errors[500]],
]

// eslint-disable-next-line max-lines-per-function -- tests are short
context('FormEntity', () => {
    it('renders', () => {
        cy.loadStory('Form/FormEntity', 'Default')
        cy.checkAccessibility()
        cy.get('h3').contains('Form entity')
        cy.get('button').contains('Save').click()
        cy.get('button').should('be.disabled')
        cy.contains(FORM_FEEDBACK.success.saved)
        cy.get('button').should('not.be.disabled')

        cy.loadStory('Form/FormEntity', 'With description')
        cy.checkAccessibility()
        cy.contains('Enter the email address')
        cy.get('a').contains('Learn more').should('have.attr', 'href', '#')

        cy.loadStory('Form/FormEntity', 'With upload progress')
        cy.get('[role="progressbar"]').should('not.exist')
        cy.get('button').contains('Save').click()
        cy.checkAccessibility()
        cy.get('[role="progressbar"]')
            .should('have.attr', 'aria-valuemax', '1')
            .should('have.attr', 'aria-label', 'Upload progress')
        cy.contains(FORM_FEEDBACK.success.saved)
        cy.get('[role="progressbar"]').should('not.exist')
    })

    it('can submit requests', () => {
        cy.loadStory('Form/FormEntity', 'With description', {
            method: 'POST',
            action: mockApiUrl,
        })
        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.get('button').click()
        cy.get('[data-test="form-entity-success"]').contains(FORM_FEEDBACK.success.saved)

        errorCodes.forEach(([code, message]) => {
            cy.intercept(mockApiUrl, { statusCode: code })
            cy.get('button').click()
            cy.get('[data-test="form-entity-success"]').should('not.exist')
            cy.get('[data-test="error"]').contains(message)
        })

        cy.goOffline()
        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.get('button').click()
        cy.get('[data-test="form-entity-success"]').should('not.exist')
        cy.get('[data-test="error"]').contains(FORM_FEEDBACK.errors.offline)
        cy.goOnline()

        cy.loadStory('Form/FormEntity', 'With description', {
            method: 'POST',
            action: mockApiUrl,
            'error.default': 'default',
            'error.400': '400',
            'error.403': '403',
            'error.429': '429',
            'error.500': '500',
            success: 'just success',
        })

        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.get('button').click()
        cy.get('[data-test="form-entity-success"]').contains('just success')

        errorCodes.forEach(([code]) => {
            cy.intercept(mockApiUrl, { statusCode: code })
            cy.get('button').click()
            cy.get('[data-test="form-entity-success"]').should('not.exist')
            cy.get('[data-test="error"]').contains(code)
        })
    })
})

export {}
