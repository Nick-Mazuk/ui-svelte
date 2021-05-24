<script lang="ts">
    import Refresh from '../../../elements/icon/refresh-cw.svelte'

    export let size: number

    $: pixels = size * 4
</script>

<div class="animate-spin" style="{`width: ${pixels}px; height: ${pixels}px;`}">
    <Refresh size="{size}" />
</div>
