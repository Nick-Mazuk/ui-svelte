<script lang="ts">
    import ChevronRight from '../../elements/icon/chevron-right.svelte'
    import ChevronDown from '../../elements/icon/chevron-down.svelte'
    import Dot from '../../elements/icon/dot.svelte'

    type TocItem = { href: string; text: string }
    type SectionItem = TocItem & { children: TocItem[] }

    export let currentItem: string
    export let items: (TocItem | SectionItem)[]
</script>

<nav>
    {#each items as item}
        <a href="{item.href}" sveltekit:prefetch class="py-2 flex items-center space-x-3 -ml-2">
            {#if !('children' in item)}
                <Dot size="{4}" align="middle" color="--c-gray-400" />
            {:else if currentItem.startsWith(item.href)}
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
        {#if 'children' in item && currentItem.startsWith(item.href)}
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
