<script lang="ts">
    import { fly } from 'svelte/transition'

    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    export let index: number
    export let isGroupHovered: boolean
    export let isLast: boolean

    const transitionSpeed = TRANSITION_SPEED_MAP.larger.in
    const transitionSpeedStyle = transitionSpeed / 1000
    const gap = 12
    const maxToasts = 3
    let height = 0

    $: scale = isGroupHovered ? 1 : 1 - index * 0.05
    $: translateY = isGroupHovered ? (height + gap) * index : gap * index
</script>

<div
    class="bg-background shadow-lg p-6 rounded-lg w-full max-w-screen border absolute bottom-0"
    class:pointer-events-none="{index > maxToasts - 1}"
    style="transform: translate3d(0, calc(-{translateY}px), -{index +
        1}px) scale({scale}); opacity: {index > maxToasts - 1
        ? 0
        : 1}; transition: opacity {transitionSpeedStyle}s, transform {transitionSpeedStyle}s;"
    bind:offsetHeight="{height}"
    in:fly="{{ duration: transitionSpeed, y: 64, opacity: 0.5 }}"
>
    <slot />
</div>

<style>
    div::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        height: 100vh;
        pointer-events: inherit;
    }
</style>
