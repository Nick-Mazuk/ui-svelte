import type { FormMethod } from '..'
import { FORM_FEEDBACK } from '../form-feedback'

// handleSubmit tests are covered in Submit component tests

const mockApiUrl = 'api'
const errorCodes: [number, string][] = [
    [400, FORM_FEEDBACK.errors[400]],
    [403, FORM_FEEDBACK.errors[403]],
    [429, FORM_FEEDBACK.errors[429]],
    [500, FORM_FEEDBACK.errors[500]],
]
context('Form', () => {
    it('can submit requests', () => {
        cy.loadStory('Form/Form', 'Default', {
            method: 'POST',
            action: mockApiUrl,
        })
        cy.checkAccessibility()

        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.get('button').click()
        cy.get('[data-test="submit-success"]').should('exist')

        errorCodes.forEach(([code, message]) => {
            cy.intercept(mockApiUrl, { statusCode: code })
            cy.get('button').click()
            cy.get('[data-test="submit-success"]').should('not.exist')
            cy.get('[data-test="error"]').contains(message)
        })

        cy.goOffline()
        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.get('button').click()
        cy.get('[data-test="submit-success"]').should('not.exist')
        cy.get('[data-test="error"]').contains('offline')
        cy.goOnline()
    })

    const methods: FormMethod[] = ['POST', 'PATCH', 'PUT', 'DELETE']

    methods.forEach((method) => {
        if (!method) return

        it(`handles ${method} requests`, () => {
            cy.loadStory('Form/Form', 'Default', {
                method,
                action: mockApiUrl,
            })
            cy.intercept({ method, url: mockApiUrl }, { statusCode: 200 })
            cy.get('button').click()
            cy.get('[data-test="submit-success"]').should('exist')
        })
    })
})
export {}
