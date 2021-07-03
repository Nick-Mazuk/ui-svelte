<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Layout from '../../../elements/icon/layout.svelte'
    import LogOut from '../../../elements/icon/log-out.svelte'
    import Settings from '../../../elements/icon/settings.svelte'
    import ListDivider from '../../list/list-divider/list-divider.svelte'
    import ListItem from '../../list/list-item/list-item.svelte'
    import List from '../../list/list.svelte'
    import Header from '../header.svelte'

    import HeaderDropdown from './header-dropdown.svelte'

    const meta = {
        title: 'Components/Header/HeaderDropdown',
        component: HeaderDropdown,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            align: {
                control: {
                    type: 'inline-radio',
                    options: ['left', 'right', 'full'],
                },
            },
            width: {
                control: 'number',
                defaultValue: 48,
            },
            isOpen: {
                control: 'boolean',
                defaultValue: false,
            },
            ariaLabel: {
                control: 'text',
                defaultValue: 'Dropdown',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Header>
        <HeaderDropdown {...args} slot="center">
            <img
                src="https://placeimg.com/150/150/nature"
                alt=""
                class="rounded-full h-8 w-8"
                slot="trigger"
            />
            <List ariaLabel="list" autofocus on:change="{() => alert('hello')}">
                <ListItem prefixIcon="{Layout}">Dashboard</ListItem>
                <ListItem prefixIcon="{Settings}">Settings</ListItem>
                <ListDivider />
                <ListItem prefixIcon="{LogOut}">Sign out</ListItem>
            </List>
        </HeaderDropdown>
    </Header>
</Story>
