<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import BottomNav from './bottom-nav.svelte'

    const meta = {
        title: 'Components/BottomNav',
        component: BottomNav,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <BottomNav {...args} />
</Story>
