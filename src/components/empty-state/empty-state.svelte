<script lang="ts">
    import Spacer from '../../utilities/spacer/spacer.svelte'

    export let title: string
    export let description = ''
</script>

<div class="max-w-2xl mx-auto">
    {#if $$slots.image}
        <div class="flex justify-center">
            <slot name="image" />
        </div>
        <Spacer />
    {/if}
    <h3 class="h3 text-center text-balance">{title}</h3>
    {#if description}
        <Spacer y="{0.5}" />
        <p class="text-lg text-center text-balance text-gray-700">
            {description}
        </p>
    {/if}
    {#if $$slots.cta}
        <Spacer />
        <div class="flex justify-center space-x-3">
            <slot name="cta" />
        </div>
    {/if}
</div>
