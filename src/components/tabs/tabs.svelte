<script lang="ts">
    import { setContext, createEventDispatcher } from 'svelte'
    import { writable } from 'svelte/store'

    export let disabled = false
    export let activeIndex = 0

    const dispatch = createEventDispatcher()

    let items: (string | null)[] = []
    const disabledStore = writable(disabled)
    const activeStore = writable(activeIndex)
    const focusStore = writable(-1)
    const register = (text: string | null) => {
        items = [...items, text]
        return items.length - 1
    }
    setContext('tabs', { disabledStore, register, activeStore, focusStore })

    $: rotateFocus = (incriment: number) => {
        const newFocus = $focusStore + incriment
        if (newFocus > items.length - 1) focusStore.set(0)
        else if (newFocus < 0) focusStore.set(items.length - 1)
        else focusStore.set(newFocus)
    }

    const handleKeyDown: svelte.JSX.KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'ArrowLeft') rotateFocus(-1)
        else if (event.key === 'ArrowRight') rotateFocus(1)
        else if (event.key === 'Home') focusStore.set(0)
        else if (event.key === 'End') focusStore.set(items.length - 1)
        if (['ArrowLeft', 'ArrowRight'].includes(event.key)) event.preventDefault()
    }
    const handleFocusOut: svelte.JSX.FocusEventHandler<HTMLDivElement> = () => focusStore.set(-1)

    $: disabledStore.set(disabled)
    $: dispatch('change', { index: $activeStore, value: items[$activeStore] })
</script>

<div
    class="max-w-full"
    data-test="tabs"
    on:keydown="{handleKeyDown}"
    on:focusout="{handleFocusOut}"
>
    <div class="border-b overflow-x-scroll flex space-x-6" role="tablist">
        <slot />
    </div>
</div>

<style>
    [data-test='tabs'] > div::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    [data-test='tabs'] > div {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>
