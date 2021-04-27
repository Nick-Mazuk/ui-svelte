<script lang="ts">
    export let title = ''
    export let right = false
</script>

<div
    class="text-base flex-1 pt-4 border-t first:pt-0 first:border-none sm:pt-0 sm:border-none"
    class:sm:text-right="{right}"
    data-component="entity-field"
>
    {#if title}
        <p class="font-bold">{title}</p>
    {/if}

    <div
        class="flex items-center space-x-3"
        class:sm:justify-end="{right}"
        class:justify-between="{right}"
    >
        <p class="text-gray"><slot /></p>
        <slot name="avatar" />
    </div>
</div>
