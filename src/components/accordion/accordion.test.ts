context('Accordion', () => {
    it('renders', () => {
        cy.loadStory('Components/Accordion', 'Default')
        cy.checkAccessibility()
    })
})

export {}
