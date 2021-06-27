<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Heart from '../../elements/icon/heart.svelte'
    import Bookmark from '../../elements/icon/bookmark.svelte'
    import Share2 from '../../elements/icon/share-2.svelte'
    import BottomNavItem from './bottom-nav-item/bottom-nav-item.svelte'

    import BottomNav from './bottom-nav.svelte'

    const meta = {
        title: 'Components/BottomNav',
        component: BottomNav,
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
    <BottomNav {...args}>
        <BottomNavItem icon="{Heart}" variant="error" fillIcon text="Like" />
        <BottomNavItem icon="{Bookmark}" variant="primary" fillIcon text="Bookmark" />
        <BottomNavItem icon="{Share2}" variant="highlight" fillIcon text="Share" />
    </BottomNav>
</Story>
