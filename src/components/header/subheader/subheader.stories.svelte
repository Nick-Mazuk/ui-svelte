<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Subheader from './subheader.svelte'

    const meta = {
        title: 'Components/Header/Subheader',
        component: Subheader,
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
    <Subheader {...args} />
</Story>
