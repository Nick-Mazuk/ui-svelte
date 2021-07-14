<script lang="ts">
    import { page } from '$app/stores'
    import { tableOfContents } from '$lib/lib/table-of-contents'
    import TableOfContents from '@nick-mazuk/ui-svelte/src/components/table-of-contents/table-of-contents.svelte'
</script>

<div class="flex md:space-x-12 wrapper my-10 w-full">
    <aside class="hidden md:block w-40 lg:w-64 flex-none">
        <TableOfContents currentItem="{$page.path}" items="{tableOfContents}" size="large" />
    </aside>
    <main class="w-full pt-2" id="main-content">
        <slot />
    </main>
</div>
