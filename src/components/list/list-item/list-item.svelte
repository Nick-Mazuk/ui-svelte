<script lang="ts" context="module">
    let counter = 0

</script>

<script lang="ts">
    import { getContext, onDestroy, onMount } from 'svelte'

    import type { ListItemShape, ListItemVariant } from '.'
    import type { ListContext, ListMode } from '..'

    import { FORM_SIZE_MAP } from '../../../form/form-sizes'

    export let variant: ListItemVariant | undefined = undefined
    export let shape: ListItemShape | undefined = undefined
    export let prefixIcon: unknown = undefined
    export let suffixIcon: unknown = undefined
    export let focused = false
    export let selected = false

    type VariantClasses = { default: string; focused: string; selected: string }

    const listContext = getContext<ListContext>('listContext')
    const focusedItem = listContext?.focusedItem
    const selectedItem = listContext?.selectedItem
    const itemKeys = listContext?.itemKeys
    const variantStore = listContext?.variantStore
    const shapeStore = listContext?.shapeStore
    const modeStore = listContext?.modeStore
    const key = String(counter++)

    onMount(() => {
        listContext?.registerListItem({ selected, key })
    })

    onDestroy(() => {
        if (focusedItem && $focusedItem === key) focusedItem.set(undefined)
        if (selectedItem && $selectedItem === key) selectedItem.set(undefined)
        if (itemKeys) itemKeys.update((current) => current.filter((item) => item != key))
    })

    const VARIANT_MAP: Record<ListItemVariant, VariantClasses> = {
        gray: {
            default: 'text-gray-700',
            focused: 'bg-gray-200 text-foreground',
            selected: 'bg-gray-200 bg-opacity-60 text-700',
        },
        primary: {
            default: 'text-primary',
            focused: 'bg-primary-200 text-primary-800',
            selected: 'bg-primary-200 bg-opacity-60 text-primary-700',
        },
        error: {
            default: 'text-error',
            focused: 'bg-error-200 text-error-800',
            selected: 'bg-error-200 bg-opacity-60 text-error-700',
        },
        highlight: {
            default: 'text-highlight',
            focused: 'bg-highlight-200 text-highlight-800',
            selected: 'bg-highlight-200 bg-opacity-60 text-highlight-700',
        },
        warning: {
            default: 'text-warning',
            focused: 'bg-warning-200 text-warning-800',
            selected: 'bg-warning-200 bg-opacity-60 text-warning-700',
        },
        success: {
            default: 'text-success',
            focused: 'bg-success-200 text-success-800',
            selected: 'bg-success-200 bg-opacity-60 text-success-700',
        },
    }

    const SHAPE_MAP: Record<ListItemShape, string> = {
        rounded: 'rounded',
        square: '',
    }

    $: if (focusedItem) focused = $focusedItem === key
    $: if (selectedItem) selected = $selectedItem === key

    let mode: ListMode
    $: mode = modeStore ? $modeStore : 'display'

    const handleFocus = () => {
        if (mode !== 'display') focusedItem?.set(key)
    }
    const handleMouseEnter = () => {
        if (mode !== 'display') focusedItem?.set(key)
    }
    const handleClick = () => {
        if (mode !== 'display') selectedItem?.set(key)
    }

    let displayedVariant: ListItemVariant
    $: {
        if (variant) displayedVariant = variant
        else if (selected && variantStore && $variantStore) displayedVariant = $variantStore
        else displayedVariant = 'gray'
    }
    let displayedShape: ListItemShape
    $: {
        if (shape) displayedShape = shape
        else if (shapeStore && $shapeStore) displayedShape = $shapeStore
        else shape = 'square'
    }

    let colorClasses: string
    $: {
        if (focused) colorClasses = VARIANT_MAP[displayedVariant].focused
        else if (selected) colorClasses = VARIANT_MAP[displayedVariant].selected
        else colorClasses = VARIANT_MAP[displayedVariant].default
    }

    $: containerClasses = [
        FORM_SIZE_MAP.default.height,
        FORM_SIZE_MAP.default.textSize,
        prefixIcon || $$slots.prefix ? '' : FORM_SIZE_MAP.default.content.paddingLeft,
        suffixIcon || $$slots.suffix ? '' : FORM_SIZE_MAP.default.content.paddingRight,
        SHAPE_MAP[displayedShape],
        colorClasses,
        mode === 'display' ? '' : 'focus:outline-none cursor-pointer',
    ].join(' ')

    let tabIndex: 0 | -1 | undefined
    $: {
        if (mode === 'display') tabIndex = undefined
        else if (!itemKeys) tabIndex = 0
        else if (selectedItem && $selectedItem) tabIndex = $selectedItem === key ? 0 : -1
        else tabIndex = $itemKeys[0] === key ? 0 : -1
    }
    let ariaSelected: boolean | undefined
    $: {
        if (mode === 'display') ariaSelected = undefined
        else ariaSelected = selected
    }

</script>

<span
    class="{containerClasses} group flex items-center"
    tabindex="{tabIndex}"
    data-list-item-key="{key}"
    data-test="list-item"
    data-focused="{focused}"
    aria-selected="{ariaSelected}"
    on:focus="{handleFocus}"
    on:mouseenter="{handleMouseEnter}"
    on:click="{handleClick}"
>
    {#if prefixIcon || $$slots.prefix}
        <span class="{FORM_SIZE_MAP.default.affix.paddingPrefix}">
            {#if prefixIcon}
                <svelte:component this="{prefixIcon}" size="{FORM_SIZE_MAP.default.affix.icon}" />
            {:else}
                <slot name="prefix" />
            {/if}
        </span>
    {/if}
    <span class="w-full">
        <slot />
    </span>
    {#if suffixIcon || $$slots.suffix}
        <span class="{FORM_SIZE_MAP.default.affix.paddingSuffix}">
            {#if prefixIcon}
                <svelte:component this="{suffixIcon}" size="{FORM_SIZE_MAP.default.affix.icon}" />
            {:else}
                <slot name="suffix" />
            {/if}
        </span>
    {/if}
</span>
