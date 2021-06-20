import { FORM_FEEDBACK } from '../../../form/form-feedback'

const mockApiUrl = 'api'
const errorCodes: [number, string][] = [
    [400, FORM_FEEDBACK.auth.errors.invalidEmailLogin],
    [403, FORM_FEEDBACK.auth.errors.invalidEmailLogin],
    [429, FORM_FEEDBACK.errors[429]],
    [500, FORM_FEEDBACK.errors[500]],
]
const validEmail = 'email@example.com'
const validPassword = 'this is a strong password'

// eslint-disable-next-line max-lines-per-function -- tests are short
context('SignUp', () => {
    it('functions properly', () => {
        cy.loadStory('Layouts/Auth/SignUp', 'Default', {
            action: mockApiUrl,
            method: 'POST',
        })
        cy.checkAccessibility()
        cy.get('h1').contains('Create account')
        cy.get('input')
            .eq(0)
            .should('have.attr', 'type', 'email')
            .should('have.attr', 'autocomplete', 'email')
        cy.get('input')
            .eq(1)
            .should('have.attr', 'type', 'password')
            .should('have.attr', 'autocomplete', 'new-password')
        cy.get('button[aria-label="Show password"').click().click()
        cy.get('[data-test="error"]').should('not.exist')
        cy.get('button[type="submit"]').contains('Create account').click()
        cy.get('[data-test="error"]').should('have.length', 2)

        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.get('input[type="email"]').type(validEmail)
        cy.get('input[type="password"]').type(validPassword)
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="error"]').should('not.exist')

        cy.goOffline()
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="error"]').contains('offline')
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
        }).as('SignUp')
        cy.get('button[type="submit"]').click()
        cy.get('button[type="submit"]').should('be.disabled')
        cy.wait('@SignUp')
        cy.get('button[type="submit"]').should('not.be.disabled')
        cy.get('[data-test="error"]').should('not.exist')
    })

    it('renders properly', () => {
        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.loadStory('Layouts/Auth/SignUp', 'Default', {
            signIn: 'url',
        })
        cy.contains('Sign in').should('have.attr', 'href', 'url')
        cy.loadStory('Layouts/Auth/SignUp', 'With note', {
            action: mockApiUrl,
            method: 'POST',
        })
        cy.contains('Sign in or create an account to continue')
        cy.get('input[type="email"]').type(validEmail)
        cy.get('input[type="password"]').type(validPassword)
        cy.get('button[type="submit"]').click()
        cy.contains('Sign in or create an account to continue').should('not.exist')
        cy.loadStory('Layouts/Auth/SignUp', 'With note', {
            passwordIsReset: 'true',
        })
        cy.contains('Sign in or create an account to continue')
        cy.contains(FORM_FEEDBACK.auth.success.passwordIsReset).should('not.exist')
    })

    it('can have extra inputs', () => {
        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.loadStory('Layouts/Auth/SignUp', 'Terms of service', {
            action: mockApiUrl,
            method: 'POST',
        })
        cy.get("input[type='checkbox']")
        cy.get('input[type="email"]').type(validEmail)
        cy.get('input[type="password"]').type(validPassword)

        cy.get('button[type="submit"]').click()

        cy.get('[data-test="error"]').should('exist')

        cy.get("input[type='checkbox']").click()
        cy.get('button[type="submit"]').click()
    })
})

export {}
