<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Portal from 'svelte-portal/src/Portal.svelte'

    export let x = 0
    export let y = 0
    export let center = false
    export let overlay: boolean | 'color' = false
    export let overlayAriaLabel: string | undefined = undefined

    const dispatch = createEventDispatcher()

    $: container = center
        ? 'fixed inset-0 flex items-center justify-center'
        : 'absolute inset-0 bottom-auto right-auto'
    $: transform = center ? '' : `transform: translate3d(${x}px, ${y}px, 0px)`

</script>

<Portal>
    {#if overlay}
        <button
            class="fixed inset-0 bg-foreground dark:bg-background w-screen h-screen cursor-default {overlay ===
            'color'
                ? 'opacity-25'
                : 'opacity-0'}"
            on:click="{() => dispatch('close', true)}"
            tabindex="{-1}"
            aria-label="{overlayAriaLabel}"
        >
        </button>
    {/if}
    <div class="{container}" style="{transform}">
        <slot />
    </div>
</Portal>
