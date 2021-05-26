<script lang="ts">
    import ChevronRight from '../../elements/icon/chevron-right.svelte'
    import ChevronDown from '../../elements/icon/chevron-down.svelte'
    import Dot from '../../elements/icon/dot.svelte'
    import type { TocItems } from '.'

    type Size = 'default' | 'large'

    export let currentItem: string
    export let items: TocItems
    export let size: Size = 'default'
    export let isOpen = false
</script>

<nav class:text-lg="{size === 'large'}">
    {#each items as item}
        <a href="{item.href}" sveltekit:prefetch class="py-2 flex items-center space-x-3 -ml-2">
            {#if !('children' in item)}
                <Dot size="{4}" align="middle" color="--c-gray-400" />
            {:else if currentItem.startsWith(item.href) || isOpen}
                <ChevronDown size="{4}" align="middle" color="--c-gray-400" />
            {:else}
                <ChevronRight size="{4}" align="middle" color="--c-gray-400" />
            {/if}
            <span
                class="hover:text-gray-900 {currentItem.startsWith(item.href)
                    ? 'text-gray-900 font-bold'
                    : 'text-gray-600'} transition-colors">{item.text}</span
            >
        </a>
        {#if 'children' in item && (currentItem.startsWith(item.href) || isOpen)}
            {#each item.children as child}
                <a
                    href="{child.href}"
                    sveltekit:prefetch
                    class="block border-l py-2 pl-5 hover:text-gray-900 transition-colors {currentItem ===
                    child.href
                        ? 'font-bold text-gray-900'
                        : 'text-gray-600'}"
                >
                    {child.text}
                </a>
            {/each}
        {/if}
    {/each}
</nav>
