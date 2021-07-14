declare module 'ac-colors'

declare namespace Cypress {
    interface Chainable {
        tab(): Chainable<Element>
        toggleDarkMode(): Chainable<Element>
        screenSize(size: 'tiny' | 'sm' | 'md' | 'lg'): Chainable<Element>
    }
}

interface ImportMetaEnv {
    VITE_PUBLIC_SITE_NAME: string
}
