<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'

    import Portal from 'svelte-portal/src/Portal.svelte'
    import type { TransitionSpeed } from '../../configs/transitions'
    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    export let x = 0
    export let y = 0
    export let center = false
    export let overlay: boolean | 'color' = false
    export let overlayAriaLabel: string | undefined = undefined
    export let transitionSpeed: TransitionSpeed = 'small'

    const dispatch = createEventDispatcher()

    $: container = center ? 'fixed top-1/2 left-1/2' : 'absolute inset-0 bottom-auto right-auto'
    $: transform = center
        ? 'transform: translate3d(-50%, -50%, 10000px)'
        : `transform: translate3d(${x}px, ${y}px, 10000px);`
</script>

<Portal>
    {#if overlay}
        <button
            class="fixed z-50 inset-0 bg-foreground dark:bg-background w-screen h-screen cursor-default focus:outline-none {overlay ===
            'color'
                ? 'opacity-50 dark:opacity-75'
                : 'opacity-0'}"
            on:click="{() => dispatch('close', true)}"
            tabindex="{-1}"
            data-test="overlay"
            aria-label="{overlayAriaLabel}"
            in:fade="{{ duration: TRANSITION_SPEED_MAP[transitionSpeed].in }}"
            out:fade="{{ duration: TRANSITION_SPEED_MAP[transitionSpeed].out }}"
            style="transform: translateZ(10000px)"
        >
        </button>
    {/if}
    <div class="z-50 {container}" style="{transform}">
        <slot />
    </div>
</Portal>
