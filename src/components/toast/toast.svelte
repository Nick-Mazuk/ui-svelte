<script lang="ts">
    import Button from '../../elements/button/button.svelte'

    import ToastItem from './_toast-item.svelte'

    type Toast = number

    let toasts: Toast[] = [0, 1, 2]
    let isHovered = false
</script>

<div class="h-screen w-screen flex items-center justify-center">
    <Button on:click="{() => (toasts = [...toasts, toasts.length])}">Add toast item</Button>
</div>
<div
    class="fixed bottom-6 right-6 w-[32rem] !max-w-full"
    on:mouseenter="{() => (isHovered = true)}"
    on:mouseleave="{() => (isHovered = false)}"
>
    {#each toasts as _, index}
        <ToastItem index="{toasts.length - 1 - index}" isGroupHovered="{isHovered}">
            {'The rabbit. '.repeat(index)}
        </ToastItem>
    {/each}
</div>
