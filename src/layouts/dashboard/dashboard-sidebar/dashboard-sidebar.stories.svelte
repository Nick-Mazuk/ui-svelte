<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import FileText from '../../../elements/icon/file-text.svelte'
    import Settings from '../../../elements/icon/settings.svelte'
    import User from '../../../elements/icon/user.svelte'

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
                defaultValue: 'Dashboard',
            },
            items: {
                control: 'object',
                defaultValue: [
                    { value: 'Posts', icon: FileText, href: '/posts' },
                    { value: 'Profile', icon: User, href: '/profile' },
                    { value: 'Settings', icon: Settings, href: '/settings' },
                ],
            },
            page: {
                control: 'text',
                defaultValue: '/profile',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <DashboardSidebar {...args}>
        <div class="mb-6 h-24 bg-gray-200 rounded-lg"></div>
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
