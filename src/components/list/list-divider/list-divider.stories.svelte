<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

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

<Template let:args>
    <ListDivider {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['list-divider.test.ts'] }}" />
