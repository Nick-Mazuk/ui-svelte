<script lang="ts">
    import ToastItem from './_toast-item.svelte'

    import { _toasts } from '.'

    let isHovered = false
</script>

<div
    class="fixed bottom-6 right-6 w-[32rem] !max-w-full"
    on:mouseenter="{() => (isHovered = true)}"
    on:mouseleave="{() => (isHovered = false)}"
>
    {#each $_toasts as item, index (item.key)}
        <ToastItem
            index="{$_toasts.length - 1 - index}"
            isGroupHovered="{isHovered}"
            item="{item}"
        />
    {/each}
</div>
