<script lang="ts">
    import Sun from '../icon/sun.svelte'
    import Moon from '../icon/moon.svelte'
    import Monitor from '../icon/monitor.svelte'
    import Select from '../../form/inputs/select/select.svelte'
    import type SvelteStore from 'svelte/store'
    import type { FormItemSize } from '../../form/form-sizes'

    type Theme = 'system' | 'dark' | 'light'

    export let store: Omit<SvelteStore.Writable<Theme>, 'update'>
    export let size: FormItemSize = 'default'

    let prefix: unknown
    $: {
        if ($store === 'light') prefix = Sun
        else if ($store === 'dark') prefix = Moon
        else prefix = Monitor
    }

</script>

<Select
    on:change="{(event) => store.set(event.detail)}"
    defaultValue="{$store}"
    ariaLabel="Set site theme"
    size="{size}"
    prefix="{prefix}"
>
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
</Select>
