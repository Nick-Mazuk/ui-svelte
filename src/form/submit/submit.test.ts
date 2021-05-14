import { FORM_FEEDBACK } from '../form-feedback'

// these tests also cover the Form component's handleSubmit tests

// eslint-disable-next-line max-lines-per-function -- individual tests are short enough
context('Submit', () => {
    it('renders', () => {
        cy.loadStory('Form/Submit', 'Default')
        cy.checkAccessibility()
        cy.get('button').contains('Submit')
        cy.get('button').should('not.be.disabled').click()
        cy.get('button').should('be.disabled')
        cy.get('button').should('not.be.disabled')
        cy.contains(FORM_FEEDBACK.success.default)
    })

    it('has a progress bar', () => {
        cy.loadStory('Form/Submit', 'Progress bar')
        cy.get('[role="progressbar"]').should('not.exist')
        cy.get('button').click()
        cy.get('[role="progressbar"]').should('exist')
        cy.get('[role="progressbar"]').should('not.exist')
    })

    it('handles errors', () => {
        cy.loadStory('Form/Submit', 'Errors')

        cy.get('button').eq(0).click()
        cy.get('[data-test="error"]').eq(0).contains(FORM_FEEDBACK.errors.default)
        cy.get('button').eq(1).click()
        cy.get('[data-test="error"]').eq(1).contains(FORM_FEEDBACK.errors.offline)
        cy.get('button').eq(2).click()
        cy.get('[data-test="error"]').eq(2).contains(FORM_FEEDBACK.errors[400])
        cy.get('button').eq(3).click()
        cy.get('[data-test="error"]').eq(3).contains(FORM_FEEDBACK.errors[403])
        cy.get('button').eq(4).click()
        cy.get('[data-test="error"]').eq(4).contains(FORM_FEEDBACK.errors[429])
        cy.get('button').eq(5).click()
        cy.get('[data-test="error"]').eq(5).contains(FORM_FEEDBACK.errors[500])

        cy.loadStory('Form/Submit', 'Errors', {
            error: 'hello',
        })

        for (let index = 0; index < 6; index++) {
            cy.get('button').eq(index).click()
            cy.get('[data-test="error"]').eq(index).contains('hello')
        }

        cy.loadStory('Form/Submit', 'Errors', {
            'error.default': 'default',
            'error.offline': 'offline',
            'error.400': '400',
            'error.403': '403',
            'error.429': '429',
            'error.500': '500',
        })
        cy.get('button').eq(0).click()
        cy.get('[data-test="error"]').eq(0).contains('default')
        cy.get('button').eq(1).click()
        cy.get('[data-test="error"]').eq(1).contains('offline')
        cy.get('button').eq(2).click()
        cy.get('[data-test="error"]').eq(2).contains('400')
        cy.get('button').eq(3).click()
        cy.get('[data-test="error"]').eq(3).contains('403')
        cy.get('button').eq(4).click()
        cy.get('[data-test="error"]').eq(4).contains('429')
        cy.get('button').eq(5).click()
        cy.get('[data-test="error"]').eq(5).contains('500')
    })
})
export {}
