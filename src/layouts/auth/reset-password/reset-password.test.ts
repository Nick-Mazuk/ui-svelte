import { FORM_FEEDBACK } from '../../../form/form-feedback'

const mockApiUrl = 'api'
const errorCodes: [number, string][] = [
    [400, FORM_FEEDBACK.auth.errors.resetPasswordLinkExpired],
    [403, FORM_FEEDBACK.auth.errors.resetPasswordLinkExpired],
    [429, FORM_FEEDBACK.errors[429]],
    [500, FORM_FEEDBACK.errors[500]],
]
const validPassword = 'this is a strong password'

context('ResetPassword', () => {
    it.only('functions properly', () => {
        cy.loadStory('Layouts/Auth/ResetPassword', 'Default', {
            action: mockApiUrl,
            method: 'POST',
        })
        cy.checkAccessibility()
        cy.get('h1').contains('Set new password')
        cy.get('input')
            .first()
            .should('have.attr', 'type', 'password')
            .should('have.attr', 'autocomplete', 'new-password')
        cy.get('[data-test="error"]').should('not.exist')
        cy.get('button[type="submit"]').contains('Set password').click()
        cy.get('[data-test="error"]')

        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.get('input').type(validPassword)
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="error"]').should('not.exist')

        cy.goOffline()
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="error"]').contains(FORM_FEEDBACK.errors.offline)
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
})

export {}
