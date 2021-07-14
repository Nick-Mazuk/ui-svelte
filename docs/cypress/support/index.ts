import 'cypress-plugin-tab'
import 'cypress-real-events/support'
import 'cypress-axe'

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

Cypress.Commands.add('toggleDarkMode', () => {
    cy.window().then((window) => {
        return window.document.querySelector('body')?.classList.toggle('dark')
    })
})
