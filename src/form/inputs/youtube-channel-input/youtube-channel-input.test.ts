context('YoutubeChannelInput', () => {
    it('renders', () => {
        cy.loadStory('Form/Inputs/YoutubeChannelInput', 'Default', {
            defaultValue: 'YouTubeCreators',
        })
        cy.get('input').should('have.value', 'https://youtube.com/YouTubeCreators')
    })
})

export {}
