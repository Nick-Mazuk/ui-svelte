Cypress.Commands.add('loadStory', (component: string, story: string) => {
    const componentParam = component.replace(/[|/]/g, '-').toLowerCase()
    const storyParam = story
        .replace(/\s/g, '-')
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
        .toLowerCase()
    return cy.visit(`iframe.html?id=${componentParam}-${storyParam}&viewMode=story`)
})
