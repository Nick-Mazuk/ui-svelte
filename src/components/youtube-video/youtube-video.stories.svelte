<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import YoutubeVideo from './youtube-video.svelte'

    const meta = {
        title: 'Components/YoutubeVideo',
        component: YoutubeVideo,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            id: {
                control: 'text',
                defaultValue: 'dQw4w9WgXcQ',
                description: 'The id of the YouTube video as assigned by YouTube',
            },
            title: {
                control: 'text',
                defaultValue: 'Never Gonna Give You Up',
                description: 'The title of the YouTube video, used for accessibility',
            },
            shadow: {
                control: 'boolean',
                defaultValue: false,
                description: 'Whether to show a shadow behind the video',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <YoutubeVideo {...args} />
</Story>
