import { FORM_FEEDBACK } from '../../../form/form-feedback'

const mockApiUrl = 'api'
const errorCodes: [number, string][] = [
    [400, FORM_FEEDBACK.auth.errors.noEmailFound],
    [403, FORM_FEEDBACK.auth.errors.noEmailFound],
    [429, FORM_FEEDBACK.errors[429]],
    [500, FORM_FEEDBACK.errors[500]],
]
const validEmail = 'email@example.com'

// eslint-disable-next-line max-lines-per-function -- tests are short
context('ForgotPassword', () => {
    it('functions properly', () => {
        cy.loadStory('Layouts/Auth/ForgotPassword', 'Default', {
            action: mockApiUrl,
            method: 'POST',
        })
        cy.checkAccessibility()
        cy.get('h1').contains('Reset password')
        cy.title().should('eq', 'Reset password')
        cy.get('input')
            .first()
            .should('have.attr', 'type', 'email')
            .should('have.attr', 'autocomplete', 'email')
        cy.get('[data-test="error"]').should('not.exist')
        cy.get('button[type="submit"]').contains('Send reset link').click()
        cy.get('[data-test="error"]')

        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.get('input[type="email"]').type(validEmail)
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="error"]').should('not.exist')
        cy.contains(FORM_FEEDBACK.auth.success.passwordResetLinkSent)

        cy.goOffline()
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="error"]').contains('offline')
        cy.contains(FORM_FEEDBACK.auth.success.passwordResetLinkSent).should('not.exist')
        cy.goOnline()

        errorCodes.forEach(([status, message]) => {
            cy.intercept(mockApiUrl, { statusCode: status })
            cy.get('button[type="submit"]').click()
            cy.get('[data-test="error"]').contains(message)
        })

        cy.intercept(mockApiUrl, (req) => {
            return new Promise(() => {
                setTimeout(() => {
                    req.reply({ statusCode: 200 })
                }, 100)
            })
        }).as('sendResetLink')
        cy.get('button[type="submit"]').click()
        cy.get('button[type="submit"]').should('be.disabled')
        cy.wait('@sendResetLink')
        cy.get('button[type="submit"]').should('not.be.disabled')
        cy.get('[data-test="error"]').should('not.exist')
    })
    it('renders properly', () => {
        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.loadStory('Layouts/Auth/ForgotPassword', 'Default', {
            signIn: 'url',
            seoTitle: 'Title',
        })
        cy.contains('Sign in').should('have.attr', 'href', 'url')
        cy.title().should('eq', 'Title')
    })
})

export {}
