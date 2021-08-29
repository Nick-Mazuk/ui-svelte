<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { scale, fade } from 'svelte/transition'

    import type { ModalDispatcher } from '..'
    import Portal from '../../../utilities/portal/portal.svelte'
    import Container from '../../../utilities/container/container.svelte'
    import Button from '../../../elements/button/button.svelte'
    import Check from '../../../elements/icon/check.svelte'
    import { TRANSITION_SPEED_MAP } from '../../../configs/transitions'

    export let title: string
    export let description = ''
    export let confirmText = ''
    export let isOpen = false
    export let isLoading = false
    export let refocusOnClose = true

    const dispatch = createEventDispatcher<ModalDispatcher>()
    let containerElement: HTMLDivElement
    let firstFocusableElement: HTMLElement
    let lastFocusableElement: HTMLElement
    let previousElement: Element | null

    const handleConfirm = () => dispatch('confirm')
    const handleWindowKeydown: svelte.JSX.KeyboardEventHandler<Window> = (event) => {
        if (!isOpen) return
        if (event.key === 'Escape') isOpen = false
        if (event.key !== 'Tab') return
        if (event.shiftKey && document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus()
            event.preventDefault()
        }
        if (!event.shiftKey && document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus()
            event.preventDefault()
        }
    }

    $: {
        if (isOpen && containerElement) {
            containerElement.focus()
            const focusableElements =
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            const elements = containerElement.querySelectorAll(focusableElements)
            const firstElement = elements[0]
            const lastElement = elements[elements.length - 1]
            if (firstElement instanceof HTMLElement) firstFocusableElement = firstElement
            if (lastElement instanceof HTMLElement) lastFocusableElement = lastElement
        }
    }
    $: if (isOpen && typeof document !== 'undefined') previousElement = document.activeElement
    $: if (
        !isOpen &&
        typeof document !== 'undefined' &&
        refocusOnClose &&
        previousElement instanceof HTMLElement
    )
        previousElement.focus()
    $: {
        if (typeof document !== 'undefined') {
            isOpen
                ? document.body.classList.add('overflow-hidden')
                : document.body.classList.remove('overflow-hidden')
        }
    }
    $: if (!isOpen) dispatch('close')
</script>

<svelte:window on:keydown="{handleWindowKeydown}" />
{#if isOpen}
    <Portal
        overlay="color"
        overlayAriaLabel="Close modal"
        center
        transitionSpeed="medium"
        on:close="{() => (isOpen = false)}"
    >
        <div
            role="alertdialog"
            data-test="modal"
            aria-labelledby="modal-title"
            aria-describedby="{description ? 'modal-description' : undefined}"
            in:scale="{{ duration: TRANSITION_SPEED_MAP.medium.in, start: 0.9 }}"
            out:fade="{{ duration: TRANSITION_SPEED_MAP.medium.out }}"
            tabindex="{-1}"
            bind:this="{containerElement}"
            class="focus:outline-none outline-none"
        >
            <Container
                variant="shadow"
                class="bg-background relative flex flex-col space-y-4 overflow-y-scroll w-[24rem]"
                style="max-height: calc(100vh - 2rem); max-width: calc(100vw - 1.5rem);"
            >
                <div class="flex justify-center">
                    <div
                        class="h-12 w-12 rounded-full bg-success-200 text-success-700 flex items-center justify-center"
                    >
                        <Check size="{6}" />
                    </div>
                </div>

                <div class="flex flex-none justify-center">
                    <div>
                        <h3 class="h5 text-center" id="modal-title">
                            {title}
                        </h3>
                        {#if description}
                            <p
                                id="modal-description"
                                class="text-center mt-2 text-gray-700 text-balance"
                            >
                                {description}
                            </p>
                        {/if}
                    </div>
                </div>
                {#if $$slots.default}
                    <div class="overflow-y-scroll overflow-x-visible">
                        <slot />
                    </div>
                {/if}
                {#if confirmText}
                    <div class="mt-2">
                        <Button width="full" on:click="{handleConfirm}" loading="{isLoading}">
                            {confirmText}
                        </Button>
                    </div>
                {/if}
            </Container>
        </div>
    </Portal>
{/if}
