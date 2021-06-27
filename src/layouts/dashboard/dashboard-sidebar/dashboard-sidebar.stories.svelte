<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import ListItem from '../../../components/list/list-item/list-item.svelte'

    import DashboardSidebar from './dashboard-sidebar.svelte'

    const meta = {
        title: 'Layouts/Dashboard/DashboardSidebar',
        component: DashboardSidebar,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            title: {
                control: 'text',
                defaultValue: 'Account settings',
            },
            sidebarItems: {
                control: 'object',
                defaultValue: [
                    {
                        text: 'General',
                        href: '/',
                    },
                    {
                        text: 'Profile',
                        href: '/profile',
                    },
                    {
                        text: 'Settings',
                        href: '/settings',
                    },
                ],
            },
            currentPage: {
                control: 'text',
                defaultValue: '/profile',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <DashboardSidebar {...args}>
        <svelte:fragment slot="items">
            <ListItem>General</ListItem>
            <ListItem>Profile</ListItem>
            <ListItem>Settings</ListItem>
        </svelte:fragment>
        <h1 class="h4">This is the main content</h1>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
        <div class="my-6 h-24 bg-gray-200 rounded-lg"></div>
    </DashboardSidebar>
</Story>
