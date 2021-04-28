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
            mode: {
                control: {
                    type: 'select',
                    options: ['display', 'focus', 'active'],
                },
                defaultValue: 'display',
                description:
                    "Defines how users are able to interact with the list. Use `display` for lists which are purely presentational. Use `focus` for lists where users should be able to hover, focus, and click a list item. Individual list items can still have an `active` prop when using `mode='focus'`. Use `active` for lists which users should be able to select a list item and visually get an active state.",
            },
            compact: {
                control: {
                    type: 'boolean',
                },
            },
            variant: {
                control: {
                    type: 'select',
                    options: ['primary', 'error', 'success', 'warning', 'highlight'],
                },
                defaultValue: 'primary',
                description:
                    "Color of the list item when active. Must use `mode='active'` or set an individual list item as active for a variant to take effect.",
            },
            rotateFocus: {
                control: {
                    type: 'boolean',
                },
                description:
                    "When `mode='focus'` or `mode='active'`, focus can wrap around when using the keyboard. So pressing `ArrowDown` when the last item is focused will focus the first item. Likewise, pressing `ArrowUp` when the first item is focused will focus the last item.",
            },
            autofocus: {
                control: {
                    type: 'boolean',
                },
                description:
                    "When `mode='focus'` or `mode='active'`, this will automatically focus the list `onMount`.",
            },
            shape: {
                control: {
                    type: 'select',
                    options: ['none', 'rounded'],
                },
                defaultValue: 'none',
                description:
                    "When `mode='focus'` or `mode='active'` and a list item is hovered, focused, or active, this sets the background shape.",
            },
            role: {
                control: {
                    type: 'text',
                },
                description: 'The aria role for the list',
            },
            ariaLabel: {
                control: {
                    type: 'text',
                },
                defaultValue: 'List component',
                description: "Required when `mode='focus'` or `mode='active'` for accessibility.",
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
<Story name="Modes" parameters="{{ jest: ['list.test.ts'] }}" let:args>
    <div class="max-w-md">
        <h2 class="h5 mt-8">Display</h2>
        <p class="mt-2">For lists which are purely presentational.</p>
    </div>
    <List {...args} mode="display" ariaLabel="Display list">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
    </List>
    <div class="max-w-md">
        <h2 class="h5 mt-8">Focus</h2>
        <p class="mt-2">
            For when users should be able to hover, focus, and click a list item. Individual list
            items can still have an <strong>active</strong> prop.
        </p>
    </div>
    <List {...args} mode="focus" ariaLabel="Display list">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
    </List>
    <div class="max-w-md">
        <h2 class="h5 mt-8">Active</h2>
        <p class="mt-2">
            For when users should be able to select a list item and visually get an active state.
        </p>
    </div>
    <List {...args} mode="active" ariaLabel="Display list">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
    </List>
</Story>
<Story
    name="Variant"
    parameters="{{ jest: ['list.test.ts'] }}"
    args="{{ variant: 'error', mode: 'active' }}"
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
    args="{{ rotateFocus: true, mode: 'active' }}"
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
    name="Autofocus"
    parameters="{{ jest: ['list.test.ts'] }}"
    args="{{ autofocus: true, mode: 'active' }}"
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
    name="Shape"
    parameters="{{ jest: ['list.test.ts'] }}"
    args="{{ shape: 'rounded', autofocus: true, mode: 'active' }}"
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
    name="On change"
    parameters="{{ jest: ['list.test.ts'] }}"
    args="{{ mode: 'active' }}"
    let:args
>
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
