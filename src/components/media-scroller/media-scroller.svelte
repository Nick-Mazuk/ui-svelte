<script lang="ts">
    import Button from '../../elements/button/button.svelte'
    import ChevronRight from '../../elements/icon/chevron-right.svelte'
    import ChevronLeft from '../../elements/icon/chevron-left.svelte'

    let classes = ''
    export { classes as class }
    export let shadow = false

    let container: HTMLDivElement
    let scrollLeft = 0
    let scrollRight = 0

    const setScrollValues = (element: HTMLDivElement) => {
        scrollLeft = element.scrollLeft
        let scrollWidth = element.scrollWidth
        let clientWidth = element.clientWidth
        scrollRight = scrollWidth - clientWidth - scrollLeft
    }

    const handleScroll: svelte.JSX.UIEventHandler<HTMLDivElement> = (event) => {
        setScrollValues(event.currentTarget)
    }

    const scrollContainerLeft = () => {
        container.scrollBy({ left: -1 * container.clientWidth, behavior: 'smooth' })
    }

    const scrollContainerRight = () => {
        container.scrollBy({ left: container.clientWidth, behavior: 'smooth' })
    }

    $: if (container) setScrollValues(container)
</script>

<div class="relative group">
    <div
        data-container
        class="flex overflow-x-scroll hide-scrollbar {classes}"
        on:scroll|preventDefault="{handleScroll}"
        bind:this="{container}"
        style="scroll-snap-type: inline mandatory; scroll-padding-left: 0;"
    >
        <slot />
    </div>
    {#if shadow}
        <div
            class="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent transition-opacity"
            class:opacity-0="{scrollLeft < 1}"
        ></div>
        <div
            class="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent transition-opacity"
            class:opacity-0="{scrollRight < 1}"
        ></div>
    {/if}
    <div
        class="absolute top-1/2 -left-6 transform -translate-y-1/2 transition-opacity opacity-0 {scrollLeft >=
        1
            ? 'group-hover:opacity-100 focus-within:opacity-100'
            : ''}"
        class:pointer-events-none="{scrollLeft < 1}"
    >
        <Button
            variant="secondary"
            shape="circle"
            size="large"
            shadow
            on:click="{scrollContainerLeft}"
        >
            <ChevronLeft />
        </Button>
    </div>

    <div
        class="absolute top-1/2 -right-6 transform -translate-y-1/2 transition-opacity opacity-0 {scrollRight >=
        1
            ? 'group-hover:opacity-100 focus-within:opacity-100'
            : ''}"
        class:pointer-events-none="{scrollRight < 1}"
    >
        <Button
            variant="secondary"
            shape="circle"
            size="large"
            shadow
            on:click="{scrollContainerRight}"
        >
            <ChevronRight />
        </Button>
    </div>
</div>

<style>
    :global([data-container] > *) {
        scroll-snap-align: start;
        flex-shrink: 0;
    }
</style>
