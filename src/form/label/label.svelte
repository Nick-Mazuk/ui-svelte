<script lang="ts">
    import { setContext } from 'svelte'
    import { writable } from 'svelte/store'
    import Tooltip from '../../components/tooltip/tooltip.svelte'

    export let value: string = ''

    setContext('label', writable(value))
</script>

<label class="flex flex-col space-y-1" on:mouseup>
    {#if value}
        <div class="font-bold">{value}</div>
    {/if}
    <slot />
</label>
