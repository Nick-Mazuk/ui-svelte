beforeEach(() => {
    cy.loadStory('Elements/Button', 'Default')
})

it('works', () => {
    cy.get('button')
})

export {}
