<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import Portal from '../../utilities/portal/portal.svelte'

    type Placement = 'top' | 'bottom' | 'left' | 'right'

    export let placement: Placement = 'bottom'
    export let value = ''

    let spanElement: HTMLSpanElement | undefined
    let boundingRect: DOMRect
    let tooltipHeight: number
    let tooltipWidth: number
    let triggerHeight: number
    let triggerWidth: number
    let isHovered = false
    let isFocused = false
    type GetPlacement = () => number
    let PLACEMENT_MAP: Record<Placement, { x: GetPlacement; y: GetPlacement }>

    $: isOpen = isHovered || isFocused
    $: {
        const trigger = spanElement?.children?.[0]
        if (trigger && isOpen) {
            boundingRect = trigger.getBoundingClientRect()
            triggerWidth = trigger.clientWidth
            triggerHeight = trigger.clientHeight
        }
    }
    $: PLACEMENT_MAP = {
        top: {
            x: () => boundingRect.x + triggerWidth / 2 - tooltipWidth / 2 + window.scrollX,
            y: () => boundingRect.y - tooltipHeight + window.scrollY,
        },
        right: {
            x: () => boundingRect.x + triggerWidth + window.scrollX,
            y: () => boundingRect.y + triggerHeight / 2 - tooltipHeight / 2 + window.scrollY,
        },
        bottom: {
            x: () => boundingRect.x + triggerWidth / 2 - tooltipWidth / 2 + window.scrollX,
            y: () => boundingRect.y + triggerHeight + window.scrollY,
        },
        left: {
            x: () => boundingRect.x - tooltipWidth + window.scrollX,
            y: () => boundingRect.y + triggerHeight / 2 - tooltipHeight / 2 + window.scrollY,
        },
    }
    $: x = boundingRect && isOpen ? PLACEMENT_MAP[placement].x() : 0
    $: y = boundingRect && isOpen ? PLACEMENT_MAP[placement].y() : 0

</script>

{#if value}
    <span
        class="contents focus:outline-none"
        bind:this="{spanElement}"
        on:mouseenter="{() => (isHovered = true)}"
        on:mouseleave="{() => (isHovered = false)}"
        on:focusin="{() => (isFocused = true)}"
        on:focusout="{() => (isFocused = false)}"
    >
        <slot name="trigger" />
    </span>
    {#if isOpen}
        <Portal x="{x}" y="{y}">
            <div
                role="tooltip"
                class="inline-flex p-2 pointer-events-none select-none"
                bind:offsetHeight="{tooltipHeight}"
                bind:offsetWidth="{tooltipWidth}"
                data-test="tooltip"
            >
                <div
                    class="bg-gray-700 dark:bg-gray-300 text-background dark:text-foreground orign-top inline-flex items-center jusitfy-center rounded py-1 px-2 max-w-xs pointer-events-none select-none"
                    out:fade="{{ duration: 100 }}"
                    in:scale="{{ duration: 150, start: 0.8 }}"
                >
                    {value}
                </div>
            </div>
        </Portal>
    {/if}
{:else}
    <span class="contents focus:outline-none"><slot name="trigger" /></span>
{/if}
