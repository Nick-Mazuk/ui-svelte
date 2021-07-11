<script lang="ts">
    import { fly } from 'svelte/transition'

    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    export let index: number
    export let isGroupHovered: boolean

    const transitionSpeed = TRANSITION_SPEED_MAP.larger.in
    const transitionSpeedStyle = transitionSpeed / 1000

    $: scale = isGroupHovered ? 1 : 1 - index * 0.05
    $: translateY = isGroupHovered ? 82 * index : 16 * index
</script>

<div
    class="bg-background shadow-lg p-6 rounded-lg w-full max-w-screen absolute bottom-0 border"
    style="transform: translate3d(0, calc(-{translateY}px), -{index +
        1}px) scale({scale}); opacity: {index > 2
        ? 0
        : 1}; transition: opacity {transitionSpeedStyle}s, transform {transitionSpeedStyle}s;"
    in:fly="{{ duration: transitionSpeed, y: 64, opacity: 0.5 }}"
>
    <slot />
</div>
