<script lang="ts">
    import { getContext } from 'svelte'

    const compact = getContext('compact')
</script>

<li role="separator" class="border-t" class:my-2="{!compact}"></li>
