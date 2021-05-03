<script lang="ts">
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    import { get, writable } from 'svelte/store'

    type Variant = 'primary' | 'error' | 'success' | 'warning' | 'highlight'
    type Shape = 'rounded' | 'none'
    type Mode = 'display' | 'focus' | 'active'

    export let compact = false
    export let role: svelte.JSX.HTMLAttributes<HTMLUListElement>['role'] = undefined
    export let variant: Variant = 'primary'
    export let rotateFocus = false
    export let autofocus: boolean | number = false
    export let ariaLabel: string | undefined = undefined
    export let shape: Shape = 'none'
    export let mode: Mode = 'display'

    let listItems: (string | null)[] = []
    const focusedListItem = writable(typeof autofocus === 'number' ? autofocus : -1)
    const activeListItem = writable(-1)
    const dispatch = createEventDispatcher()
    let element: HTMLUListElement

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
        setContext('listItemShape', shape)
        setContext('autofocusList', autofocus)
        setContext('listMode', mode)
        setContext('listRole', role)
    }

    onMount(() => {
        if (autofocus) element.focus()
    })

    $: rotateFocusedItem = (amount: 1 | -1) => {
        focusedListItem.update((current) => {
            const newItem = current + amount
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

        if (['ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault()
    }
    const handleFocusOut: svelte.JSX.FocusEventHandler<HTMLUListElement> = () => {
        focusedListItem.set(-1)
        if (mode !== 'active') activeListItem.set(-1)
    }
    $: {
        if ($activeListItem >= 0)
            dispatch('change', { index: $activeListItem, value: listItems[$activeListItem] })
    }
    let listRole: svelte.JSX.HTMLAttributes<HTMLUListElement>['role']
    $: {
        if (role) listRole = role
        else if (mode !== 'display') listRole = 'listbox'
    }
</script>

<ul
    class:py-2="{!compact && role !== 'group'}"
    role="{listRole}"
    on:keydown="{handleKeypress}"
    on:focusout="{handleFocusOut}"
    aria-label="{ariaLabel}"
    bind:this="{element}"
    class="focus:bg-primary"
    data-test="list"
>
    <slot />
</ul>
