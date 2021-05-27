<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import ListDivider from './list-divider.svelte'

    const meta = {
        title: 'Components/List/ListDivider',
        component: ListDivider,
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
    <ListDivider {...args} />
</Story>
