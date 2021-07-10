context('AccordionGroup', () => {
    it('renders', () => {
        cy.loadStory('Components/Accordion/AccordionGroup', 'Default')
        cy.checkAccessibility()
    })
})

export {}
