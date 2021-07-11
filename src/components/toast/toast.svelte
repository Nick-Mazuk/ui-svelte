<script lang="ts">
    import Button from '../../elements/button/button.svelte'

    import ToastItem from './_toast-item.svelte'

    let toasts: number[] = [0, 1, 2]
    let isHovered = false
</script>

<div class="h-screen w-screen flex items-center justify-center">
    <Button on:click="{() => (toasts = [...toasts, toasts.length])}">Add toast item</Button>
</div>

<div
    class="absolute bottom-6 wrapper !max-w-full flex justify-end"
    on:mouseenter="{() => (isHovered = true)}"
    on:mouseleave="{() => (isHovered = false)}"
>
    <div class="relative w-[32rem] max-w-full h-full">
        {#each toasts as _, index}
            <ToastItem index="{toasts.length - 1 - index}" isGroupHovered="{isHovered}">
                The Evil Rabbit jumped over the fence.
            </ToastItem>
        {/each}
    </div>
</div>
