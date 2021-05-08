<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import Portal from '../../utilities/portal/portal.svelte'
    type Placement = 'top' | 'bottom' | 'left' | 'right'

    export let placement: Placement = 'bottom'

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
            x: () => boundingRect.x + triggerWidth / 2 - tooltipWidth / 2,
            y: () => boundingRect.y - tooltipHeight,
        },
        right: {
            x: () => boundingRect.x + triggerWidth,
            y: () => boundingRect.y + triggerHeight / 2 - tooltipHeight / 2,
        },
        bottom: {
            x: () => boundingRect.x + triggerWidth / 2 - tooltipWidth / 2,
            y: () => boundingRect.y + triggerHeight,
        },
        left: {
            x: () => boundingRect.x - tooltipWidth,
            y: () => boundingRect.y + triggerHeight / 2 - tooltipHeight / 2,
        },
    }
    $: x = boundingRect && isOpen ? PLACEMENT_MAP[placement].x() : 0
    $: y = boundingRect && isOpen ? PLACEMENT_MAP[placement].y() : 0
</script>

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
                class="bg-gray-700 text-background orign-top inline-flex items-center jusitfy-center rounded py-1 px-2 max-w-xs pointer-events-none select-none"
                out:fade="{{ duration: 100 }}"
                in:scale="{{ duration: 150, start: 0.8 }}"
            >
                <slot />
            </div>
        </div>
    </Portal>
{/if}