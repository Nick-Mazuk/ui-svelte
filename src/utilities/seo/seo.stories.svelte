<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Seo from './seo.svelte'

    const meta = {
        title: 'Utilities/Seo',
        component: Seo,
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
    <Seo {...args} />
</Story>
