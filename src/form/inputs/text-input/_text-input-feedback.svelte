<script lang="ts">
    import Error from '../../../elements/error/error.svelte'

    export let isInvalidState: boolean
    export let errorMessage: string
    export let helpText: string
    export let feedback: string
    export let hideFeedback: boolean

</script>

<div class="flex space-x-6">
    {#if isInvalidState}
        <div class="flex-none">
            <Error size="small">{errorMessage}</Error>
        </div>
    {:else if helpText}
        <p class="flex-none text-sm text-gray-700">{helpText}</p>
    {/if}

    {#if feedback && !hideFeedback}
        <p class="w-full text-sm text-gray-700 text-right">{feedback}</p>
    {/if}
</div>
