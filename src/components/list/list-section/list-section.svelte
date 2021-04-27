<script lang="ts">
    import { getContext } from 'svelte'
    import List from '../list.svelte'

    const compact = getContext<boolean>('compact')

    export let title: string
</script>

<span
    aria-hidden="true"
    class="text-sm font-semibold text-gray-700 my-2 block"
    class:px-3="{compact}"
    class:px-4="{!compact}"
    >{title}
</span>
<List role="group" compact="{compact}">
    <slot />
</List>
