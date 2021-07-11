<script lang="ts" context="module">
    let counter = 0
</script>

<script lang="ts">
    import { getContext } from 'svelte'

    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    import ChevronDown from '../../elements/icon/chevron-down.svelte'
    import Container from '../../utilities/container/container.svelte'
    import type { AccordionGroupContext } from './accordion-group'
    import EmptyComponent from './_empty-component.svelte'

    type Size = 'default' | 'small'

    export let title: string
    export let unstyledContents = false
    export let defaultExpanded = false
    export let card = false
    export let size: Size = 'default'

    const openedItem = getContext<AccordionGroupContext>('accordionGroupContext')?.openedItem
    const id = counter++
    const transitionSpeed = TRANSITION_SPEED_MAP.small.default
    let details: HTMLDetailsElement
    let summary: HTMLDivElement
    let content: HTMLDivElement
    let isExpanded = defaultExpanded
    let isOpening = false
    let isClosing = false
    let animation: Animation | undefined

    if (defaultExpanded) openedItem?.set(id)

    const onAnimationFinished = (isOpen: boolean) => {
        isExpanded = isOpen
        animation = undefined
        isClosing = false
        isOpening = false
        details.style.height = ''
        details.style.overflow = ''
    }

    const open = () => {
        openedItem?.set(id)
        isExpanded = true
        details.style.height = `${details.offsetHeight}px`
        details.style.overflow = 'hidden'
        window.requestAnimationFrame(() => {
            isOpening = true
            const startHeight = `${details.offsetHeight}px`
            const endHeight = `${summary.offsetHeight + content.offsetHeight}px`

            animation?.cancel()

            animation = details.animate(
                {
                    height: [startHeight, endHeight],
                },
                {
                    duration: transitionSpeed,
                    easing: 'ease-out',
                }
            )
            animation.onfinish = () => onAnimationFinished(true)
            animation.oncancel = () => (isOpening = false)
        })
    }

    const close = () => {
        isClosing = true
        details.style.overflow = 'hidden'
        const startHeight = `${details.offsetHeight}px`
        const endHeight = `${summary.offsetHeight + 4}px`

        animation?.cancel()

        animation = details.animate(
            {
                height: [startHeight, endHeight],
            },
            {
                duration: transitionSpeed,
                easing: 'ease-out',
            }
        )

        animation.onfinish = () => onAnimationFinished(false)
        animation.oncancel = () => (isClosing = false)
    }

    const handleClick = () => {
        if (isClosing || !isExpanded) open()
        else if (isOpening || isExpanded) close()
    }

    $: contentClasses = unstyledContents ? '' : 'prose !max-w-full'
    $: wrapperComponent = card ? Container : EmptyComponent
    $: {
        if (
            openedItem &&
            $openedItem !== id &&
            typeof window !== 'undefined' &&
            details &&
            summary &&
            content &&
            isExpanded
        )
            close()
    }
</script>

<svelte:component this="{wrapperComponent}">
    <details
        open="{isExpanded}"
        bind:this="{details}"
        class:border-t="{!card}"
        class:border-b="{!card}"
        class:-mt-px="{!card}"
    >
        <summary
            class="py-6 flex items-center w-full justify-between cursor-pointer focus:outline-none focus:bg-gray-200 hover:!bg-transparent"
            class:py-6="{size === 'default'}"
            class:py-4="{size === 'small'}"
            bind:this="{summary}"
            on:click|preventDefault="{handleClick}"
            on:mouseup="{() => summary.blur()}"
        >
            <span class:h5="{size === 'default'}" class:h6="{size === 'small'}">{title}</span>
            <span
                class="transition-transform transform -mx-1"
                class:rotate-180="{isExpanded && !isClosing}"
            >
                <ChevronDown size="{6}" />
            </span>
        </summary>

        <div class="{contentClasses} pb-3" bind:this="{content}" data-test="accordion-content">
            <slot />
        </div>
    </details>
</svelte:component>
