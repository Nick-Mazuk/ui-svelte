<script lang="ts">
    import Spacer from '@nick-mazuk/ui-svelte/src/utilities/spacer/spacer.svelte'

    export let title: string
    export let description = ''
</script>

<h2 class="h4">{title}</h2>
{#if description}
    <Spacer />
    <p class="text-xl text-gray">{description}</p>
{/if}
<Spacer />
