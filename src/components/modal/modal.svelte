<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { scale, fade } from 'svelte/transition'

    import type { ModalDispatcher } from '.'
    import Portal from '../../utilities/portal/portal.svelte'
    import Container from '../../utilities/container/container.svelte'
    import Button from '../../elements/button/button.svelte'
    import X from '../../elements/icon/x.svelte'
    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    type Size = 'small' | 'default' | 'large'

    export let title: string
    export let description = ''
    export let close = true
    export let confirmText = ''
    export let cancelText = ''
    export let size: Size = 'default'
    export let isOpen = false
    export let refocusOnClose = true

    const dispatch = createEventDispatcher<ModalDispatcher>()
    let containerElement: HTMLDivElement
    let firstFocusableElement: HTMLElement
    let lastFocusableElement: HTMLElement
    let previousElement: Element | null

    const SIZE_MAP: Record<Size, string> = {
        small: 'w-[24rem]',
        default: 'w-[32rem]',
        large: 'w-[42rem]',
    }

    const handleConfirm = () => dispatch('confirm')
    const handleCancel = () => {
        dispatch('cancel')
        isOpen = false
    }
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
                class="bg-background w-full relative overflow-y-scroll {SIZE_MAP[size]}"
                style="max-height: calc(100vh - 2rem); max-width: calc(100vw - 1.5rem);"
                padding="{false}"
            >
                <Container class="-m-px" rounded="none">
                    <div class="relative flex flex-none justify-between">
                        <div>
                            <h3 class="h6" id="modal-title">
                                {title}
                            </h3>
                            {#if description}
                                <p id="modal-description" class="mt-3">
                                    {description}
                                </p>
                            {/if}
                        </div>
                        {#if close}
                            <div class="absolute top-0 right-0 pr-1 pt-1 flex-none">
                                <Button
                                    shape="circle"
                                    variant="static"
                                    glue="{['right', 'top']}"
                                    on:click="{() => (isOpen = false)}"
                                    ariaLabel="Close modal"
                                >
                                    <X />
                                </Button>
                            </div>
                        {/if}
                    </div>
                    {#if $$slots.default}
                        <div class="pt-3 border-t mt-3 overflow-y-scroll">
                            <slot />
                        </div>
                    {/if}
                </Container>
                {#if $$slots.actions || confirmText}
                    <Container variant="fill" class="-m-px py-3" rounded="none">
                        <div class="flex justify-end flex-none">
                            {#if $$slots.actions}
                                <slot name="actions" />
                            {:else}
                                <div class="flex space-x-4 justify-end">
                                    {#if cancelText}
                                        <div class="flex-shrink-0">
                                            <Button
                                                variant="secondary"
                                                on:click="{handleCancel}"
                                                size="small"
                                            >
                                                {cancelText}
                                            </Button>
                                        </div>
                                    {/if}
                                    <div class="flex-shrink-0">
                                        <Button on:click="{handleConfirm}" size="small">
                                            {confirmText}
                                        </Button>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </Container>
                {/if}
            </Container>
        </div>
    </Portal>
{/if}
