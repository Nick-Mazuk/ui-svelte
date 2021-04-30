<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import ListItem from '../list-item/list-item.svelte'
    import List from '../list.svelte'

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
    <List ariaLabel="List section component">
        <ListSection {...args}>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
        </ListSection>
    </List>
</Template>

<Story name="Default" />
