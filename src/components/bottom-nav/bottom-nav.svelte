<script lang="ts">
    import Heart from '../../elements/icon/heart.svelte'
    import Bookmark from '../../elements/icon/bookmark.svelte'
    import Share2 from '../../elements/icon/share-2.svelte'

    import { FORM_SIZE_MAP } from '../../form/form-sizes'
    import BottomNavItem from './bottom-nav-item/bottom-nav-item.svelte'
</script>

<nav
    class="fixed bottom-0 left-0 right-0 {FORM_SIZE_MAP.large
        .height} shadow-2xl border-t bg-background flex"
>
    <BottomNavItem icon="{Heart}" />
    <BottomNavItem icon="{Bookmark}" />
    <BottomNavItem icon="{Share2}" />
</nav>
