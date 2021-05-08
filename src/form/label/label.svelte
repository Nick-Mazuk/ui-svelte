<script lang="ts">
    import { setContext } from 'svelte'
    import { writable } from 'svelte/store'

    export let value: string = ''
    export let info: string = ''

    setContext('label', writable(value))
</script>

<label class="flex flex-col space-y-1" on:mouseup>
    {#if value}
        <div class="font-bold">{value}</div>
    {/if}
    <slot />
</label>
