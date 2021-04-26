<script lang="ts">
    import List from '../list/list.svelte'

    export let loose = false

    let open = false
    const toggleMenu = () => (open = !open)
    const closeMenu = () => (open = false)
    const openMenu = () => (open = true)
</script>

<span on:click="{toggleMenu}"><slot name="button" /></span>
{#if open}
    <div class="w-64 shadow-lg border rounded-lg overflow-hidden" on:click="{closeMenu}">
        <List compact="{!loose}" role="menu">
            <slot />
        </List>
    </div>
{/if}
