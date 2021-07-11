<script lang="ts">
    import { setContext } from 'svelte'
    import { writable } from 'svelte/store'
    import type { AccordionGroupContext } from '.'

    const openedItem = writable(-1)

    setContext<AccordionGroupContext>('accordionGroupContext', {
        openedItem,
    })
</script>

<slot />
