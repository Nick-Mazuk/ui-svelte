<script lang="ts">
    // todo
    // static (roles = ['list', 'listitem'])
    import { setContext } from 'svelte'
    import { get, writable } from 'svelte/store'
    import { createEventDispatcher } from 'svelte'

    type Variant = 'primary' | 'error' | 'success' | 'warning' | 'gray' | 'highlight'

    export let compact = false
    export let role: svelte.JSX.HTMLAttributes<HTMLUListElement>['role'] = 'listbox'
    export let variant: Variant = 'gray'
    export let rotateFocus = false
    export let autofocus = false
    export let ariaLabel: string | undefined = undefined

    let listItems: (string | null)[] = []
    const focusedListItem = writable(-1)
    const activeListItem = writable(-1)
    const dispatch = createEventDispatcher()

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
        setContext('autofocusList', autofocus)
    }

    $: rotateFocusedItem = (amount: 1 | -1) => {
        focusedListItem.update((current) => {
            let newItem = current + amount
            if (!rotateFocus) return Math.min(listItems.length - 1, Math.max(0, newItem))
            if (newItem < 0) return listItems.length - 1
            if (newItem > listItems.length - 1) return 0
            return newItem
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
    $: {
        if ($activeListItem >= 0)
            dispatch('change', { index: $activeListItem, value: listItems[$activeListItem] })
    }
</script>

<ul
    class:py-2="{!compact && role !== 'group'}"
    role="{role}"
    on:keydown="{handleKeypress}"
    on:focusout="{handleFocusOut}"
    aria-label="{ariaLabel}"
>
    <slot />
</ul>
