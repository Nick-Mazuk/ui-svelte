<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Edit from '../../elements/icon/edit.svelte'
    import Home from '../../elements/icon/home.svelte'
    import Settings from '../../elements/icon/settings.svelte'
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
            mode: {
                control: 'inline-radio',
                options: ['nonInteractive', 'interactive', 'singleSelect'],
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
        },
    }

</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <List {...args}>
        <ListItem prefixIcon="{Home}">Home</ListItem>
        <ListItem prefixIcon="{Edit}">Posts</ListItem>
        <ListItem prefixIcon="{Settings}">Settings</ListItem>
    </List>
</Story>
