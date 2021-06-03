<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Edit from '../../elements/icon/edit.svelte'
    import Home from '../../elements/icon/home.svelte'
    import Settings from '../../elements/icon/settings.svelte'
    import ListDivider from './list-divider/list-divider.svelte'
    import ListItem from './list-item/list-item.svelte'

    import List from './list.svelte'

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
            ariaLabel: {
                control: 'text',
                defaultValue: 'List',
            },
            mode: {
                control: 'inline-radio',
                options: ['display', 'interactive', 'singleSelect'],
                defaultValue: 'interactive',
            },
            variant: {
                control: 'select',
                options: ['gray', 'primary', 'error', 'success', 'warning', 'highlight'],
                defaultValue: 'gray',
            },
            shape: {
                control: 'inline-radio',
                options: ['square', 'rounded'],
                defaultValue: 'square',
            },
            rotateFocus: {
                control: 'boolean',
                description:
                    'Wraps focus when user uses their arrow keys (e.g., ArrowUp when first item is focus will focus the last item).',
            },
            autofocus: {
                control: 'boolean',
            },
            compact: {
                control: 'boolean',
            },
            role: {
                control: 'inline-radio',
                options: ['list', 'listbox', 'menu'],
                defaultValue: undefined,
            },
        },
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <List {...args}>
        <ListItem prefixIcon="{Home}" on:click="{() => alert('world')}">Home</ListItem>
        <ListItem prefixIcon="{Edit}" on:click="{() => alert('hello')}">Posts</ListItem>
        <ListItem prefixIcon="{Settings}">Settings</ListItem>
    </List>
</Story>

<Story name="With divider" let:args>
    <List {...args}>
        <ListItem prefixIcon="{Home}">Home</ListItem>
        <ListItem prefixIcon="{Edit}">Posts</ListItem>
        <ListDivider />
        <ListItem prefixIcon="{Settings}">Settings</ListItem>
    </List>
</Story>
