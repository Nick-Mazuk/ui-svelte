<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import ListItem from './list-item.svelte'
    import Plus from '../../../elements/icon/plus.svelte'
    import List from '../list.svelte'

    const meta = {
        title: 'Components/List/ListItem',
        component: ListItem,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            href: {
                control: {
                    type: 'text',
                },
            },
            variant: {
                control: {
                    type: 'select',
                    options: ['primary', 'error', 'success', 'warning', 'gray', 'highlight'],
                },
                description: 'Color of the list item when active',
            },
            active: {
                control: {
                    type: 'boolean',
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <List>
        <ListItem {...args}>Hello world</ListItem>
    </List>
</Template>

<Story name="Default" parameters="{{ jest: ['list-item.test.ts'] }}" />
<Story name="Prefix" parameters="{{ jest: ['list-item.test.ts'] }}" let:args>
    <List>
        <ListItem {...args}>
            <Plus slot="prefix" />
            Hello world
        </ListItem>
    </List>
</Story>
<Story name="Suffix" parameters="{{ jest: ['list-item.test.ts'] }}" let:args>
    <List>
        <ListItem {...args}>
            Hello world
            <Plus slot="suffix" />
        </ListItem>
    </List>
</Story>
<Story
    name="Variant"
    parameters="{{ jest: ['list-item.test.ts'] }}"
    args="{{ variant: 'primary' }}"
    let:args
>
    <List>
        <ListItem {...args}>
            Hello world
            <Plus slot="prefix" />
        </ListItem>
    </List>
</Story>
<Story
    name="Active"
    parameters="{{ jest: ['list-item.test.ts'] }}"
    args="{{ active: true, variant: 'primary' }}"
    let:args
>
    <List>
        <ListItem {...args}>
            Hello world
            <Plus slot="prefix" />
        </ListItem>
    </List>
</Story>
<Story
    name="On action"
    parameters="{{ jest: ['list-item.test.ts'] }}"
    args="{{ variant: 'primary' }}"
    let:args
>
    <List>
        <ListItem {...args} on:action="{() => alert('I have been activated')}">
            Hello world
            <Plus slot="prefix" />
        </ListItem>
    </List>
</Story>
