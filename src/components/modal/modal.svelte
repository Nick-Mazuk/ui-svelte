<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { scale, fade } from 'svelte/transition'

    import type { ModalDispatcher } from '.'
    import Portal from '../../utilities/portal/portal.svelte'
    import Container from '../../utilities/container/container.svelte'
    import Button from '../../elements/button/button.svelte'
    import X from '../../elements/icon/x.svelte'
    import Check from '../../elements/icon/check.svelte'
    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    type Variant = 'default' | 'success'
    type Size = 'small' | 'default' | 'large'

    export let title: string
    export let description = ''
    export let close = true
    export let confirmText = ''
    export let cancelText = ''
    export let variant: Variant = 'default'
    export let size: Size | undefined = undefined
    export let isOpen = false
    export let refocusOnClose = true

    const dispatch = createEventDispatcher<ModalDispatcher>()
    let containerElement: HTMLDivElement
    let firstFocusableElement: HTMLElement
    let lastFocusableElement: HTMLElement
    let previousElement: Element | null

    const SIZE_MAP: Record<Size, string> = {
        small: 'w-[28rem]',
        default: 'w-[32rem]',
        large: 'w-[42rem]',
    }

    let buttonWidth: 'full' | undefined
    $: buttonWidth = variant === 'success' ? 'full' : undefined
    $: descriptionClasses =
        variant === 'success' ? 'text-center mt-2 text-gray-700 text-balance' : ''
    $: buttonContainerClasses = variant === 'success' ? 'flex-1' : 'flex-shrink-0'
    let displaySize: Size
    $: {
        if (size) displaySize = size
        else if (variant === 'success') displaySize = 'small'
        else displaySize = 'default'
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
                class="bg-background w-full relative flex flex-col space-y-4 overflow-y-scroll {SIZE_MAP[
                    displaySize
                ]}"
                style="max-height: calc(100vh - 2rem); max-width: calc(100vw - 1.5rem);"
            >
                {#if variant === 'success'}
                    <div class="flex justify-center">
                        <div
                            class="h-12 w-12 rounded-full bg-success-200 text-success-700 flex items-center justify-center"
                        >
                            <Check size="{6}" />
                        </div>
                    </div>
                {/if}
                <div
                    class="flex flex-none p-px"
                    class:justify-between="{variant !== 'success'}"
                    class:justify-center="{variant === 'success'}"
                >
                    <div>
                        <h3
                            class:h4="{variant !== 'success'}"
                            class:h5="{variant === 'success'}"
                            id="modal-title"
                            class:text-center="{variant === 'success'}"
                        >
                            {title}
                        </h3>
                        {#if description}
                            <p id="modal-description" class="{descriptionClasses}">
                                {description}
                            </p>
                        {/if}
                    </div>
                    {#if close && variant !== 'success'}
                        <div class="pr-1 pt-1 flex-none">
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
                    <div class="overflow-y-scroll overflow-x-visible p-px">
                        <slot />
                    </div>
                {/if}
                {#if $$slots.actions || confirmText}
                    <div class="flex justify-end flex-none p-px">
                        {#if $$slots.actions && variant !== 'success'}
                            <slot name="actions" />
                        {:else}
                            <div
                                class="flex space-x-4"
                                class:w-full="{variant === 'success'}"
                                class:mt-2="{variant === 'success'}"
                            >
                                {#if cancelText}
                                    <div class="{buttonContainerClasses}">
                                        <Button
                                            variant="secondary"
                                            width="{buttonWidth}"
                                            on:click="{handleCancel}"
                                        >
                                            {cancelText}
                                        </Button>
                                    </div>
                                {/if}
                                <div class="{buttonContainerClasses}">
                                    <Button width="{buttonWidth}" on:click="{handleConfirm}">
                                        {confirmText}
                                    </Button>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}
            </Container>
        </div>
    </Portal>
{/if}
