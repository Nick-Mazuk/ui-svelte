<script lang="ts">
    import { createEventDispatcher, setContext } from 'svelte'
    import { writable } from 'svelte/store'
    import type { ListContext, ListMode, RegisterListItem, ListRole, ListDispatcher } from '.'
    import type { ListItemShape, ListItemVariant } from './list-item'

    export let ariaLabel: string
    export let rotateFocus = false
    export let variant: ListItemVariant | undefined = undefined
    export let shape: ListItemShape | undefined = undefined
    export let mode: ListMode = 'interactive'
    export let autofocus = false
    export let compact = false
    export let role: ListRole | undefined = undefined

    const getRole = (roleProp: ListRole | undefined): ListRole => {
        if (roleProp) return roleProp
        if (mode === 'display') return 'list'
        return 'listbox'
    }

    const itemKeys = writable<string[]>([])
    const focusedItem = writable<string | undefined>(undefined)
    const selectedItem = writable<string | undefined>(undefined)
    const variantStore = writable(variant)
    const shapeStore = writable(shape)
    const modeStore = writable(mode)
    const compactStore = writable(compact)
    const roleStore = writable(getRole(role))

    $: variantStore.set(variant)
    $: shapeStore.set(shape)
    $: modeStore.set(mode)
    $: modeStore.set(mode)
    $: roleStore.set(getRole(role))

    let containerElement: HTMLDivElement
    const dispatch = createEventDispatcher<ListDispatcher>()

    const registerListItem: RegisterListItem = ({ selected, key }) => {
        if (!containerElement) return
        const listItemElements = containerElement.querySelectorAll('[data-list-item-key]')
        const newKeys: string[] = []
        listItemElements.forEach((item) => {
            if (!(item instanceof HTMLElement)) return
            const key = item.dataset.listItemKey
            if (key) newKeys.push(key)
        })
        if (selected) selectedItem.set(key)
        itemKeys.set(newKeys)
    }

    setContext<ListContext>('listContext', {
        itemKeys,
        focusedItem,
        selectedItem,
        registerListItem,
        variantStore,
        shapeStore,
        modeStore,
        compactStore,
        roleStore,
    })

    const rotateFocusedItem = (amount: 1 | -1) => {
        const listItems = $itemKeys
        if (!$focusedItem) {
            focusedItem.set(listItems[amount === 1 ? 0 : listItems.length - 1])
            return
        }
        const currentIndex = listItems.indexOf($focusedItem)
        let newIndex = currentIndex + amount
        if (!rotateFocus) newIndex = Math.min(listItems.length - 1, Math.max(0, newIndex))
        else if (newIndex < 0) newIndex = listItems.length - 1
        else if (newIndex >= listItems.length) newIndex = 0
        focusedItem.set(listItems[newIndex])
    }

    const handleKeyDown: svelte.JSX.KeyboardEventHandler<HTMLDivElement | Window> = (event) => {
        const key = event.key
        if (key === 'ArrowDown') rotateFocusedItem(1)
        else if (key === 'ArrowUp') rotateFocusedItem(-1)
        else if (key === 'Home') focusedItem.set($itemKeys[0])
        else if (key === 'End') focusedItem.set($itemKeys[$itemKeys.length - 1])
        else if (key === ' ' && $focusedItem && mode === 'singleSelect')
            selectedItem.set($focusedItem)
        else if (key === 'Enter' && $focusedItem && mode === 'singleSelect')
            selectedItem.set($focusedItem)
    }

    $: if (autofocus && containerElement) containerElement.focus()

    selectedItem.subscribe((item) => {
        dispatch('change', {
            index: $itemKeys.indexOf(item ?? ''),
        })
    })
</script>

<div
    tabindex="{autofocus ? -1 : undefined}"
    class:focus:outline-none="{autofocus}"
    class:py-2="{!compact}"
    data-test="list"
    role="{$roleStore}"
    aria-label="{ariaLabel}"
    bind:this="{containerElement}"
    on:mouseleave="{() => focusedItem.set(undefined)}"
    on:focusout="{() => focusedItem.set(undefined)}"
    on:keydown|preventDefault="{handleKeyDown}"
>
    <slot />
</div>
