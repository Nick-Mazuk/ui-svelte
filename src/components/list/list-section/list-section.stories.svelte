<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import ListSection from './list-section.svelte'

    const meta = {
        title: 'Components/List/ListSection',
        component: ListSection,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            title: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Section title',
                required: true,
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <ListSection {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['list-section.test.ts'] }}" />
