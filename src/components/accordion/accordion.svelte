<script lang="ts">
    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    import ChevronDown from '../../elements/icon/chevron-down.svelte'

    export let title: string
    export let unstyledContents = false

    let details: HTMLDetailsElement
    let summary: HTMLDivElement
    let content: HTMLDivElement

    const transitionSpeed = TRANSITION_SPEED_MAP.medium.default
    let isExpanded = false
    let isOpening = false
    let isClosing = false
    let animation: Animation | undefined

    const onAnimationFinished = (isOpen: boolean) => {
        isExpanded = isOpen
        animation = undefined
        isClosing = false
        isOpening = false
        details.style.height = ''
        details.style.overflow = ''
    }

    const open = () => {
        details.style.height = `${details.offsetHeight}px`
        isExpanded = true
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
        const startHeight = `${details.offsetHeight}px`
        const endHeight = `${summary.offsetHeight}px`

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
        details.style.overflow = 'hidden'

        if (isClosing || !isExpanded) open()
        else if (isOpening || isExpanded) close()
    }

    $: contentClasses = unstyledContents ? '' : 'prose !max-w-full'
</script>

<details open="{isExpanded}" bind:this="{details}">
    <summary
        class="py-6 flex items-center w-full justify-between cursor-pointer focus:outline-none"
        bind:this="{summary}"
        on:click|preventDefault="{handleClick}"
    >
        <span class="h5">{title}</span>
        <span
            class="transition-transform transform -mx-2"
            class:rotate-180="{isExpanded && !isClosing}"
        >
            <ChevronDown />
        </span>
    </summary>
    <div class="{contentClasses}" bind:this="{content}">
        <slot />
    </div>
</details>
