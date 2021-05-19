context('YoutubeVideoInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/YoutubeVideoInput', 'Default', {
            defaultValue: '1234',
        })
        cy.get('input').should('have.value', 'https://youtube.com/watch?v=1234')
    })
})

export {}
