<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import ChevronDown from '../../elements/icon/chevron-down.svelte'
    import Button from '../../elements/button/button.svelte'

    import Menu from './menu.svelte'
    import ListItem from '../list/list-item/list-item.svelte'
    import Home from '../../elements/icon/home.svelte'
    import Edit from '../../elements/icon/edit.svelte'
    import Settings from '../../elements/icon/settings.svelte'

    const meta = {
        title: 'Components/Menu',
        component: Menu,
        parameters: {
            docs: {
                description: {
                    component: 'Dropdown menu opened via button. Supports keyboard navigation.',
                },
            },
        },
        argTypes: {
            placement: {
                control: {
                    type: 'select',
                    options: [
                        'top',
                        'right',
                        'bottom',
                        'left',
                        'top-start',
                        'top-end',
                        'right-start',
                        'right-end',
                        'left-start',
                        'left-end',
                        'bottom-start',
                        'bottom-end',
                    ],
                },
                defaultValue: 'bottom-start',
            },
            loose: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            width: {
                control: {
                    type: 'number',
                },
                defaultValue: 0,
            },
            minWidth: {
                control: {
                    type: 'number',
                },
                defaultValue: 32,
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Menu {...args}>
        <Button shape="square" slot="button" ariaLabel="Open menu">
            <ChevronDown />
        </Button>
        <ListItem prefixIcon="{Home}">Home</ListItem>
        <ListItem prefixIcon="{Edit}">Posts</ListItem>
        <ListItem prefixIcon="{Settings}">Settings</ListItem>
    </Menu>
</Story>
<Story name="Custom width" args="{{ minWidth: 64 }}" let:args>
    <Menu {...args}>
        <Button shape="square" slot="button" ariaLabel="Open menu">
            <ChevronDown />
        </Button>
        <ListItem prefixIcon="{Home}">Home</ListItem>
        <ListItem prefixIcon="{Edit}">Posts</ListItem>
        <ListItem prefixIcon="{Settings}">Settings</ListItem>
    </Menu>
</Story>
