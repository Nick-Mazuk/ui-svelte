<script lang="ts">
    import type { SidebarItems } from '.'
    import Button from '../../../elements/button/button.svelte'
    import ChevronDown from '../../../elements/icon/chevron-down.svelte'
    import ChevronUp from '../../../elements/icon/chevron-up.svelte'

    export let sidebarItems: SidebarItems
    export let currentPage: string
    export let title: string

    let showSidebarItems = false
</script>

<div class="md:flex md:space-x-12">
    <aside class="py-6 border-b mb-6 md:w-64 flex-none md:py-0 md:border-b-0 md:mb-0">
        <div class="md:hidden">
            <Button
                variant="static"
                glue="{['left']}"
                suffix="{showSidebarItems ? ChevronUp : ChevronDown}"
                on:click="{() => (showSidebarItems = !showSidebarItems)}"
            >
                {title}
            </Button>
        </div>
        <nav class="flex flex-col md:sticky md:top-16" class:hidden="{!showSidebarItems}">
            {#each sidebarItems as item}
                <a
                    sveltekit:prefetch
                    href="{item.href}"
                    class="py-2"
                    class:font-bold="{item.href === currentPage}"
                    data-test="dashbar-sidebar-item"
                >
                    {item.text}
                </a>
            {/each}
        </nav>
    </aside>
    <main id="main-content" class="w-full"><slot /></main>
</div>
