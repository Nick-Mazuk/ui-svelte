<script lang="ts">
    import List from '../../../components/list/list.svelte'
    import Button from '../../../elements/button/button.svelte'
    import ChevronDown from '../../../elements/icon/chevron-down.svelte'
    import ChevronUp from '../../../elements/icon/chevron-up.svelte'

    export let title: string

    let showSidebarItems = false
</script>

<div class="md:flex md:space-x-12">
    <aside class="pb-6 border-b mb-6 md:w-64 flex-none md:py-0 md:border-b-0 md:mb-0">
        <div class="md:hidden">
            <Button
                variant="static"
                glue="{['left', 'top']}"
                suffix="{showSidebarItems ? ChevronUp : ChevronDown}"
                on:click="{() => (showSidebarItems = !showSidebarItems)}"
            >
                {title}
            </Button>
        </div>
        <nav class="flex flex-col md:flex md:sticky md:top-16" class:hidden="{!showSidebarItems}">
            <List
                ariaLabel="Sidebar"
                mode="singleSelect"
                shape="rounded"
                on:change="{() => (showSidebarItems = false)}"
            >
                <slot name="items" />
            </List>
        </nav>
    </aside>
    <main id="main-content" class="w-full"><slot /></main>
</div>
