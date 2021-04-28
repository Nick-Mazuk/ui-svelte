<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import ListItem from './list-item/list-item.svelte'
    import List from './list.svelte'
    import Home from '../../elements/icon/home.svelte'
    import Settings from '../../elements/icon/settings.svelte'
    import Edit from '../../elements/icon/edit.svelte'
    import Info from '../../elements/icon/info.svelte'
    import ListDivider from './list-divider/list-divider.svelte'
    import ListSection from './list-section/list-section.svelte'

    const meta = {
        title: 'Components/List',
        component: List,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            compact: {
                control: {
                    type: 'boolean',
                },
            },
            role: {
                control: {
                    type: 'text',
                },
                description: 'The aria role for the list',
            },
            variant: {
                control: {
                    type: 'select',
                    options: ['primary', 'error', 'success', 'warning', 'gray', 'highlight'],
                },
                defaultValue: 'gray',
                description: 'Color of the list item when active',
            },
            rotateFocus: {
                control: {
                    type: 'boolean',
                },
            },
            autofocus: {
                control: {
                    type: 'boolean',
                },
            },
            ariaLabel: {
                control: {
                    type: 'text',
                },
                defaultValue: 'List component',
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <List {...args}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
        <ListItem variant="error">Delete</ListItem>
    </List>
</Template>

<Story name="Default" parameters="{{ jest: ['list.test.ts'] }}" />
<Story name="Leading icon" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <List {...args}>
        <ListItem>
            <Home slot="prefix" />
            Home
        </ListItem>
        <ListItem>
            <Edit slot="prefix" />
            Posts
        </ListItem>
        <ListItem>
            <Settings slot="prefix" />
            Settings
        </ListItem>
    </List>
</Story>
<Story name="Trailing icon" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <List {...args}>
        <ListItem>
            Home
            <Info slot="suffix" />
        </ListItem>
        <ListItem>
            Posts
            <Info slot="suffix" />
        </ListItem>
        <ListItem>
            Settings
            <Info slot="suffix" />
        </ListItem>
    </List>
</Story>
<Story name="Divider" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <List {...args}>
        <ListItem>
            <Home slot="prefix" />
            Home
        </ListItem>
        <ListItem>
            <Edit slot="prefix" />
            Posts
        </ListItem>
        <ListDivider />
        <ListItem>
            <Settings slot="prefix" />
            Settings
        </ListItem>
    </List>
</Story>
<Story name="Sections" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <List {...args}>
        <ListSection title="Dashboard">
            <ListItem>
                <Home slot="prefix" />
                Home
            </ListItem>
            <ListItem>
                <Edit slot="prefix" />
                Posts
            </ListItem>
        </ListSection>
        <ListSection title="Account">
            <ListItem>
                <Settings slot="prefix" />
                Settings
            </ListItem>
        </ListSection>
    </List>
</Story>
<Story
    name="Variant"
    parameters="{{ jest: ['list.test.ts'] }}"
    args="{{ variant: 'primary' }}"
    let:args
>
    <List {...args}>
        <ListItem>
            <Home slot="prefix" />
            Home
        </ListItem>
        <ListItem>
            <Edit slot="prefix" />
            Posts
        </ListItem>
        <ListDivider />
        <ListItem>
            <Settings slot="prefix" />
            Settings
        </ListItem>
    </List>
</Story>
<Story
    name="Rotate focus"
    parameters="{{ jest: ['list.test.ts'] }}"
    args="{{ rotateFocus: true }}"
    let:args
>
    <List {...args}>
        <ListItem>
            <Home slot="prefix" />
            Home
        </ListItem>
        <ListItem>
            <Edit slot="prefix" />
            Posts
        </ListItem>
        <ListDivider />
        <ListItem>
            <Settings slot="prefix" />
            Settings
        </ListItem>
    </List>
</Story>
<Story name="On change" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <List
        {...args}
        on:change="{(event) => alert(`Selected item ${event.detail.index}: ${event.detail.value}`)}"
    >
        <ListItem>
            <Home slot="prefix" />
            Home
        </ListItem>
        <ListItem>
            <Edit slot="prefix" />
            Posts
        </ListItem>
        <ListDivider />
        <ListItem>
            <Settings slot="prefix" />
            Settings
        </ListItem>
    </List>
</Story>

<Story
    name="Autofocus"
    parameters="{{ jest: ['list.test.ts'] }}"
    args="{{ autofocus: true }}"
    let:args
>
    <List {...args}>
        <ListItem>
            <Home slot="prefix" />
            Home
        </ListItem>
        <ListItem>
            <Edit slot="prefix" />
            Posts
        </ListItem>
        <ListDivider />
        <ListItem>
            <Settings slot="prefix" />
            Settings
        </ListItem>
    </List>
</Story>
