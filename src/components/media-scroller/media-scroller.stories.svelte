<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import MediaScroller from './media-scroller.svelte'
    import Spacer from '../../utilities/spacer/spacer.svelte'

    const meta = {
        title: 'Components/MediaScroller',
        component: MediaScroller,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            class: {
                control: 'text',
                defaultValue: 'space-x-3',
            },
            shadow: {
                control: 'boolean',
                defaultValue: false,
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <MediaScroller {...args}>
        {#each new Array(12) as _}
            <div class="flex-none">
                <div
                    class="h-36 w-56 bg-gradient-to-br from-accent-magenta via-highlight-400 to-primary-600 rounded-lg shadow-md overflow-x-auto"
                ></div>
                <Spacer y="{0.5}" />
                <div class="w-48 h-3 bg-gray-400"></div>
                <Spacer y="{0.25}" />
                <div class="w-24 h-3 bg-gray-400"></div>
            </div>
        {/each}
    </MediaScroller>
</Story>
