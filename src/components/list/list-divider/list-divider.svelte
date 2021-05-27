<script lang="ts">
    import { getContext } from 'svelte'
    import type { ListContext } from '..'
    const listContext = getContext<ListContext>('listContext')
    const compactStore = listContext?.compactStore

    $: compact = compactStore ? $compactStore : false

</script>

<span role="separator" class="border-t block" class:my-2="{!compact}"></span>
