import { FORM_FEEDBACK } from '../../../form/form-feedback'

const mockApiUrl = 'api'
const errorCodes: [number, string][] = [
    [400, FORM_FEEDBACK.auth.errors.invalidEmailLogin],
    [403, FORM_FEEDBACK.auth.errors.invalidEmailLogin],
    [429, FORM_FEEDBACK.errors[429]],
    [500, FORM_FEEDBACK.errors[500]],
]
const validEmail = 'email@example.com'
const validPassword = 'password'

// eslint-disable-next-line max-lines-per-function -- tests are short
context('SignIn', () => {
    it('functions properly', () => {
        cy.loadStory('Layouts/Auth/SignIn', 'Default', {
            action: mockApiUrl,
            method: 'POST',
        })
        cy.checkAccessibility()
        cy.get('h1').contains('Sign in')
        cy.title().should('eq', 'Sign in')
        cy.get('input')
            .eq(0)
            .should('have.attr', 'type', 'email')
            .should('have.attr', 'autocomplete', 'email')
        cy.get('input')
            .eq(1)
            .should('have.attr', 'type', 'password')
            .should('have.attr', 'autocomplete', 'current-password')
        cy.get('button[aria-label="Show password"').click().click()
        cy.get('[data-test="error"]').should('not.exist')
        cy.get('button[type="submit"]').contains('Sign in').click()
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
        }).as('signIn')
        cy.get('button[type="submit"]').click()
        cy.get('button[type="submit"]').should('be.disabled')
        cy.wait('@signIn')
        cy.get('button[type="submit"]').should('not.be.disabled')
        cy.get('[data-test="error"]').should('not.exist')
    })

    it('renders properly', () => {
        cy.intercept(mockApiUrl, { statusCode: 200 })
        cy.loadStory('Layouts/Auth/SignIn', 'Default', {
            forgotPassword: 'url',
            seoTitle: 'Title',
        })
        cy.title().should('eq', 'Title')
        cy.contains('Forgot password').should('have.attr', 'href', 'url')
        cy.loadStory('Layouts/Auth/SignIn', 'Default', {
            createAccount: 'url',
        })
        cy.contains('Create account').should('have.attr', 'href', 'url')
        cy.loadStory('Layouts/Auth/SignIn', 'Default', {
            createAccount: 'url',
            forgotPassword: 'url2',
        })
        cy.contains('Create account').should('have.attr', 'href', 'url')
        cy.contains('Forgot password').should('have.attr', 'href', 'url2')
        cy.loadStory('Layouts/Auth/SignIn', 'Default', {
            passwordIsReset: 'true',
            action: mockApiUrl,
            method: 'POST',
        })
        cy.contains(FORM_FEEDBACK.auth.success.passwordIsReset)
        cy.get('input[type="email"]').type(validEmail)
        cy.get('input[type="password"]').type(validPassword)
        cy.get('button[type="submit"]').click()
        cy.contains(FORM_FEEDBACK.auth.success.passwordIsReset).should('not.exist')
        cy.loadStory('Layouts/Auth/SignIn', 'With note', {
            action: mockApiUrl,
            method: 'POST',
        })
        cy.contains('Sign in or create an account to continue')
        cy.get('input[type="email"]').type(validEmail)
        cy.get('input[type="password"]').type(validPassword)
        cy.get('button[type="submit"]').click()
        cy.contains('Sign in or create an account to continue').should('not.exist')
        cy.loadStory('Layouts/Auth/SignIn', 'With note', {
            passwordIsReset: 'true',
        })
        cy.contains('Sign in or create an account to continue')
        cy.contains(FORM_FEEDBACK.auth.success.passwordIsReset).should('not.exist')
    })
})

export {}
