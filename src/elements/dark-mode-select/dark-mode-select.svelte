<script lang="ts">
    import Sun from '../icon/sun.svelte'
    import Moon from '../icon/moon.svelte'
    import Monitor from '../icon/monitor.svelte'
    import Select from '../../form/select/select.svelte'
    import type SvelteStore from 'svelte/store'

    type Theme = 'system' | 'dark' | 'light'

    export let store: SvelteStore.Writable<Theme>
</script>

<Select on:change="{(event) => store.set(event.detail)}" value="{$store}" title="Set site theme">
    <svelte:fragment slot="prefix">
        {#if $store === 'light'}
            <Sun />
        {:else if $store === 'dark'}
            <Moon />
        {:else}
            <Monitor />
        {/if}
    </svelte:fragment>
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
</Select>
