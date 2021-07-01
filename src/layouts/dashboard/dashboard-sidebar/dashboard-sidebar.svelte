<script lang="ts">
    import ListItem from '../../../components/list/list-item/list-item.svelte'

    import List from '../../../components/list/list.svelte'
    import Select from '../../../form/inputs/select/select.svelte'

    import type { DashboardSidebarItem } from '.'

    export let title: string
    export let items: DashboardSidebarItem[] = []
    export let page: string
</script>

<div class="wrapper my-6">
    <h1 class="h5">{title}</h1>
    <div class="md:flex md:space-x-12">
        <aside class="mt-3 mb-6 md:w-64 flex-none md:my-0">
            <div class="md:hidden">
                <Select on:change defaultValue="{page}">
                    {#each items as item}
                        <option value="{item.href}">{item.value}</option>
                    {/each}
                </Select>
            </div>
            <nav class="hidden flex-col md:flex sticky top-20">
                <List ariaLabel="Sidebar" mode="singleSelect" shape="rounded">
                    {#each items as item}
                        <ListItem
                            prefixIcon="{item.icon}"
                            selected="{page === item.href}"
                            href="{item.href}"
                        >
                            {item.value}
                        </ListItem>
                    {/each}
                </List>
            </nav>
        </aside>
        <main id="main-content" class="w-full md:pt-2"><slot /></main>
    </div>
</div>
