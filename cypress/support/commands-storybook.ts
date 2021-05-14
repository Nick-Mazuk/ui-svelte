import 'cypress-axe'

Cypress.Commands.add(
    'loadStory',
    (component: string, story: string, knobs?: { [knob: string]: string }) => {
        const componentParameter = component.replace(/[|/]/gu, '-').toLowerCase()
        const storyParameter = story
            .replace(/\s/gu, '-')
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/gu, '$1-$2')
            .toLowerCase()
        const queryParameters: Record<string, string> = {
            id: `${componentParameter}-${storyParameter}`,
            viewMode: 'story',
        }
        if (knobs) {
            const knobParameters: string[] = []
            Object.keys(knobs).forEach((knob) => {
                knobParameters.push(`${knob}:${knobs[knob]}`)
            })
            queryParameters.args = knobParameters.join(';')
        }
        const queryStrings: string[] = []
        Object.keys(queryParameters).forEach((parameter) => {
            queryStrings.push(`${parameter}=${queryParameters[parameter]}`)
        })
        cy.visit(`/iframe.html?${queryStrings.join('&')}`)
        cy.injectAxe()
        cy.configureAxe({
            rules: [
                { id: 'landmark-one-main', enabled: false },
                { id: 'page-has-heading-one', enabled: false },
                { id: 'region', enabled: false },
                { id: 'bypass', enabled: false },
                { id: 'skip-link', enabled: false },
            ],
        })
    }
)

Cypress.Commands.add('toggleDarkMode', () => {
    cy.window().then((window) => {
        return window.document.querySelector('body')?.classList.toggle('dark')
    })
})

Cypress.Commands.add('checkAccessibility', ({ page } = { page: false }) => {
    if (page) {
        cy.configureAxe({
            rules: [
                { id: 'landmark-one-main', enabled: true },
                { id: 'page-has-heading-one', enabled: true },
                { id: 'region', enabled: true },
                { id: 'bypass', enabled: true },
                { id: 'skip-link', enabled: true },
            ],
        })
    }
    cy.checkA11y()
})

/* cy.toggleDarkMode()
   // race condition with dark mode https://stackoverflow.com/questions/67377305/cypress-updating-dom-class-produces-race-condition
   cy.wait(100)
   cy.checkA11y(undefined, { runOnly: { type: 'rule', values: ['color-contrast'] } })
   cy.toggleDarkMode() */

type ScreenSize = 'tiny' | 'sm' | 'md' | 'lg'

Cypress.Commands.add('screenSize', (size: ScreenSize) => {
    const SIZE_MAP: Record<ScreenSize, [number, number]> = {
        tiny: [300, 640],
        sm: [639, 640],
        md: [767, 640],
        lg: [1023, 640],
    }
    cy.viewport(SIZE_MAP[size][0], SIZE_MAP[size][1])
})

Cypress.Commands.add('goOffline', () => {
    cy.log('**go offline**')
        .then(() => {
            return Cypress.automation('remote:debugger:protocol', {
                command: 'Network.enable',
            })
        })
        .then(() => {
            return Cypress.automation('remote:debugger:protocol', {
                command: 'Network.emulateNetworkConditions',
                params: {
                    offline: true,
                    latency: -1,
                    downloadThroughput: -1,
                    uploadThroughput: -1,
                },
            })
        })
})

Cypress.Commands.add('goOnline', () => {
    cy.log('**go online**')
        .then(() => {
            return Cypress.automation('remote:debugger:protocol', {
                command: 'Network.emulateNetworkConditions',
                params: {
                    offline: false,
                    latency: -1,
                    downloadThroughput: -1,
                    uploadThroughput: -1,
                },
            })
        })
        .then(() => {
            return Cypress.automation('remote:debugger:protocol', {
                command: 'Network.disable',
            })
        })
})
