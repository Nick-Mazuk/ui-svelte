<script lang="ts">
    import { fly, fade } from 'svelte/transition'

    import { TRANSITION_SPEED_MAP } from '../../../configs/transitions'
    import type { HeaderItemBreakpoint } from '../header-item-wrapper'
    import HeaderItemWrapper from '../header-item-wrapper/header-item-wrapper.svelte'

    type Align = 'left' | 'right' | 'full'

    export let align: Align = 'left'
    export let width = 48
    export let isOpen = false
    export let ariaLabel: string
    export let breakpoint: HeaderItemBreakpoint = 'sm'

    let isFocusLeaving = false

    const handleFocusIn = () => {
        isOpen = true
        isFocusLeaving = false
    }
    const handleFocusOut = () => {
        isFocusLeaving = true
        window.requestAnimationFrame(() => {
            if (isFocusLeaving) isOpen = false
        })
    }

    if (typeof window !== 'undefined')
        window.addEventListener('sveltekit:navigation-end', () => (isOpen = false))

    $: style = align === 'full' ? '' : `width: ${width * 4}px; max-width: 100vw;`
</script>

<HeaderItemWrapper breakpoint="{breakpoint}">
    <div
        class="h-full flex items-stretch group"
        class:relative="{align !== 'full'}"
        on:mouseenter="{() => (isOpen = true)}"
        on:focusin="{handleFocusIn}"
        on:mouseleave="{() => (isOpen = false)}"
        on:focusout="{handleFocusOut}"
    >
        {#if isOpen}
            <div
                class="absolute top-16 border border-t-0 shadow-lg bg-background rounded-b-lg"
                class:right-0="{align === 'full' || align === 'right'}"
                class:left-0="{align === 'full' || align === 'left'}"
                in:fly="{{ duration: TRANSITION_SPEED_MAP.medium.in, y: -16 }}"
                out:fade="{{ duration: TRANSITION_SPEED_MAP.medium.out }}"
                style="{style}"
                data-test="header-dropdown-content"
            >
                <slot />
            </div>
        {/if}
        <button class="focus:outline-none" aria-label="{ariaLabel}">
            <slot name="trigger" />
        </button>
    </div>
</HeaderItemWrapper>
