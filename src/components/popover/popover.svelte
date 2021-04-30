<script lang="ts">
    import Portal from '../../utilities/portal/portal.svelte'
    import { createEventDispatcher, getContext, setContext } from 'svelte'
    import type { Writable } from 'svelte/store'
    import { writable } from 'svelte/store'

    type Placement =
        | 'top'
        | 'right'
        | 'bottom'
        | 'left'
        | 'top-start'
        | 'top-end'
        | 'right-start'
        | 'right-end'
        | 'left-start'
        | 'left-end'
        | 'bottom-start'
        | 'bottom-end'

    export let overlay = false
    export let disabled = false
    export let placement: Placement = 'right-start'
    export let open = false

    type GetPlacement = () => number
    let PLACEMENT_MAP: Record<Placement, { x: GetPlacement; y: GetPlacement }>

    let triggerWidth = 0
    let triggerHeight = 0
    let popoverWidth = 0
    let popoverHeight = 0
    let trigger: HTMLDivElement

    const dispatch = createEventDispatcher()

    const outerDisabledStore = getContext<Writable<boolean> | undefined>('disabled')
    const disabledStore = outerDisabledStore || writable(disabled)

    if (typeof outerDisabledStore === 'undefined') {
        setContext('disabled', disabledStore)
    }

    const closePopover = () => {
        if (isDisabled) return
        open = false
        dispatch('close', true)
    }
    const openPopover = () => {
        if (isDisabled) return
        open = true
        dispatch('open', true)
    }

    $: PLACEMENT_MAP = {
        top: {
            x: () => boundingRect.x + triggerWidth / 2 - popoverWidth / 2,
            y: () => boundingRect.y - popoverHeight,
        },
        right: {
            x: () => boundingRect.x + triggerWidth,
            y: () => boundingRect.y + triggerHeight / 2 - popoverHeight / 2,
        },
        bottom: {
            x: () => boundingRect.x + triggerWidth / 2 - popoverWidth / 2,
            y: () => boundingRect.y + triggerHeight,
        },
        left: {
            x: () => boundingRect.x - popoverWidth,
            y: () => boundingRect.y + triggerHeight / 2 - popoverHeight / 2,
        },
        'top-start': {
            x: () => boundingRect.x,
            y: () => boundingRect.y - popoverHeight,
        },
        'top-end': {
            x: () => boundingRect.x + triggerWidth - popoverWidth,
            y: () => boundingRect.y - popoverHeight,
        },
        'right-start': {
            x: () => boundingRect.x + triggerWidth,
            y: () => boundingRect.y,
        },
        'right-end': {
            x: () => boundingRect.x + triggerWidth,
            y: () => boundingRect.y + triggerHeight - popoverHeight,
        },
        'bottom-start': {
            x: () => boundingRect.x,
            y: () => boundingRect.y + triggerHeight,
        },
        'bottom-end': {
            x: () => boundingRect.x + triggerWidth - popoverWidth,
            y: () => boundingRect.y + triggerHeight,
        },
        'left-start': {
            x: () => boundingRect.x - popoverWidth,
            y: () => boundingRect.y,
        },
        'left-end': {
            x: () => boundingRect.x - popoverWidth,
            y: () => boundingRect.y + triggerHeight - popoverHeight,
        },
    }
    let boundingRect: DOMRect
    $: if (open) boundingRect = trigger?.getBoundingClientRect()
    $: if (typeof outerDisabledStore === 'undefined') disabledStore.set(disabled)
    $: x = boundingRect && open ? PLACEMENT_MAP[placement].x() : 0
    $: y = boundingRect && open ? PLACEMENT_MAP[placement].y() : 0
    $: isDisabled = typeof outerDisabledStore === 'undefined' ? disabled : $outerDisabledStore
</script>

<svelte:window
    on:keydown="{(event) => {
        if (event.key === 'Escape') open = false
    }}"
/>

<div
    class="inline-flex"
    on:click="{openPopover}"
    bind:this="{trigger}"
    bind:offsetWidth="{triggerWidth}"
    bind:offsetHeight="{triggerHeight}"
>
    <slot name="trigger" />
</div>
{#if open && !disabled}
    <Portal on:close="{closePopover}" overlay="{overlay ? 'color' : true}" x="{x}" y="{y}">
        <div
            class="inline-flex"
            bind:offsetHeight="{popoverHeight}"
            bind:offsetWidth="{popoverWidth}"
        >
            <slot />
        </div>
    </Portal>
{/if}
