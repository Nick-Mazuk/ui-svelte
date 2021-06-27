<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import BottomNavItem from './bottom-nav-item.svelte'

    const meta = {
        title: 'Components/BottomNav/BottomNavItem',
        component: BottomNavItem,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <BottomNavItem {...args} />
</Story>
