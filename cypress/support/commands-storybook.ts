Cypress.Commands.add(
    'loadStory',
    (component: string, story: string, knobs?: { [knob: string]: string }) => {
        const componentParam = component.replace(/[|/]/g, '-').toLowerCase()
        const storyParam = story
            .replace(/\s/g, '-')
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
            .toLowerCase()
        const queryParams: Record<string, string> = {
            id: `${componentParam}-${storyParam}`,
            viewMode: 'story',
        }
        if (knobs) {
            let knobParams: string[] = []
            Object.keys(knobs).forEach((knob) => {
                knobParams.push(`${knob}:${knobs[knob]}`)
            })
            queryParams.args = knobParams.join(';')
        }
        let queryStrings: string[] = []
        Object.keys(queryParams).forEach((param) => {
            queryStrings.push(`${param}=${queryParams[param]}`)
        })
        return cy.visit(`iframe.html?${queryStrings.join('&')}`)
    }
)
