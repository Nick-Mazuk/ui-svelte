<script lang="ts">
    // todo
    // wrap focused
    // add events (activatedItem)
    // static
    // auto-focus
    // list items have aria-selected and aria-current
    // Clear all accessibility warnings from StoryBook (at end)
    // Add all accessibility suggestions from MDC https://material.io/components/lists/web#using-lists
    import { setContext } from 'svelte'
    import { get, writable } from 'svelte/store'

    type Variant = 'primary' | 'error' | 'success' | 'warning' | 'gray' | 'highlight'

    export let compact = false
    export let role: svelte.JSX.HTMLAttributes<HTMLUListElement>['role'] = 'listbox'
    export let variant: Variant = 'gray'

    let listItems: (string | null)[] = []
    const focusedListItem = writable(-1)
    const activeListItem = writable(-1)

    const registerListItem = (text: string | null): number => {
        listItems = [...listItems, text]
        return listItems.length - 1
    }

    if (role !== 'group') {
        setContext('compact', compact)
        setContext('registerListItem', registerListItem)
        setContext('focusedListItem', focusedListItem)
        setContext('activeListItem', activeListItem)
        setContext('listItemVariant', variant)
    }

    $: rotateFocusedItem = (amount: 1 | -1) => {
        focusedListItem.update((current) => {
            let newItem = current + amount
            return Math.min(listItems.length - 1, Math.max(0, newItem))
        })
    }

    let handleKeypress: svelte.JSX.KeyboardEventHandler<HTMLUListElement>

    $: handleKeypress = (event) => {
        if (event.key === 'ArrowDown') rotateFocusedItem(1)
        if (event.key === 'ArrowUp') rotateFocusedItem(-1)
        if (event.key === 'Home') focusedListItem.set(0)
        if (event.key === 'End') focusedListItem.set(listItems.length - 1)
        if (event.key === ' ') activeListItem.set(get(focusedListItem))
        if (event.key === 'Enter') activeListItem.set(get(focusedListItem))
    }
    const handleFocusOut: svelte.JSX.FocusEventHandler<HTMLUListElement> = () => {
        focusedListItem.set(-1)
    }
</script>

<ul
    class:py-2="{!compact && role !== 'group'}"
    role="{role}"
    on:keydown="{handleKeypress}"
    on:focusout="{handleFocusOut}"
>
    <slot />
</ul>
