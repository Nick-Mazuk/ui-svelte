<script lang="ts">
    export let title = ''
    export let right = false
</script>

<div class="text-sm flex-1 flex" class:justify-end="{right}" class:text-right="{right}">
    <div class="flex space-x-3 items-center">
        <div>
            {#if title}
                <p class="text-bold">{title}</p>
            {/if}
            {#if $$slots.default}
                <p class="text-gray"><slot /></p>
            {/if}
        </div>
        <slot name="avatar" />
    </div>
</div>
