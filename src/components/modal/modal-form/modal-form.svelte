<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { scale, fade } from 'svelte/transition'

    import type { ModalDispatcher } from '..'
    import Portal from '../../../utilities/portal/portal.svelte'
    import Container from '../../../utilities/container/container.svelte'
    import Button from '../../../elements/button/button.svelte'
    import X from '../../../elements/icon/x.svelte'
    import { TRANSITION_SPEED_MAP } from '../../../configs/transitions'
    import FormEntity from '../../../form/form-entity/form-entity.svelte'
    import { slugify } from '@nick-mazuk/lib/esm/text-styling'
    import { FORM_FEEDBACK } from '../../../form/form-feedback'
    import type { FormMethod, HandleSubmit } from '../../../form'
    import type { DescriptionLink, ErrorMessages } from '../../../form/form-entity'

    type Size = 'small' | 'default' | 'large'

    export let title: string
    export let description = ''
    export let descriptionLink: DescriptionLink | undefined = undefined
    export let size: Size = 'default'
    export let isOpen = false
    export let refocusOnClose = true

    export let primaryAction = 'Save'
    export let primaryActionSubmit = true
    export let secondaryAction = ''
    export let secondaryActionSubmit = true
    export let destructiveAction = ''
    export let destructiveActionSubmit = true

    export let method: FormMethod = undefined
    export let action: string | undefined = undefined
    export let handleSubmit: HandleSubmit = undefined
    export let resetOnSubmit = false
    export let allowOffline = false
    export let error: Partial<ErrorMessages> | string = ''
    export let success = FORM_FEEDBACK.success.saved
    export let progress: number | undefined = undefined

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
            aria-labelledby="{slugify(title)}-form-title"
            aria-describedby="{description ? `${slugify(title)}-form-description` : undefined}"
            in:scale="{{ duration: TRANSITION_SPEED_MAP.medium.in, start: 0.9 }}"
            out:fade="{{ duration: TRANSITION_SPEED_MAP.medium.out }}"
            tabindex="{-1}"
            bind:this="{containerElement}"
            class="focus:outline-none outline-none"
        >
            <Container
                variant="shadow"
                class="bg-background border-0 w-full relative flex flex-col space-y-4 overflow-y-scroll {SIZE_MAP[
                    size
                ]}"
                padding="{0}"
                style="max-height: calc(100vh - 2rem); max-width: calc(100vw - 1.5rem);"
            >
                <FormEntity
                    title="{title}"
                    description="{description}"
                    descriptionLink="{descriptionLink}"
                    primaryAction="{primaryAction}"
                    primaryActionSubmit="{primaryActionSubmit}"
                    secondaryAction="{secondaryAction}"
                    secondaryActionSubmit="{secondaryActionSubmit}"
                    destructiveAction="{destructiveAction}"
                    destructiveActionSubmit="{destructiveActionSubmit}"
                    method="{method}"
                    action="{action}"
                    handleSubmit="{handleSubmit}"
                    resetOnSubmit="{resetOnSubmit}"
                    allowOffline="{allowOffline}"
                    error="{error}"
                    success="{success}"
                    progress="{progress}"
                    on:primaryClick
                    on:secondaryClick
                    on:destructiveClick
                    on:stateChange
                    on:success
                    on:error
                >
                    <svelte:fragment slot="extra-actions">
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
                    </svelte:fragment>
                    <slot />
                </FormEntity>
            </Container>
        </div>
    </Portal>
{/if}
