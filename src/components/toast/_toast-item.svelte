<script lang="ts" context="module">
    type Heights = { key: number; height: number }[]
    let heights = writable<Heights>([])
    let counter = 0
</script>

<script lang="ts">
    import { onDestroy, onMount } from 'svelte'
    import { writable } from 'svelte/store'

    import { fly } from 'svelte/transition'

    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    export let index: number
    export let isGroupHovered: boolean

    const transitionSpeed = TRANSITION_SPEED_MAP.larger.in
    const transitionSpeedStyle = transitionSpeed / 1000
    const gap = 12
    const maxToasts = 3
    const key = counter++
    let height = 0

    let stackedOffset = 0
    $: {
        stackedOffset = 0
        $heights.forEach((item) => {
            if (item.key > key) {
                stackedOffset += item.height
                stackedOffset += gap
            }
        })
    }
    $: scale = isGroupHovered ? 1 : 1 - index * 0.05
    $: translateY = isGroupHovered ? stackedOffset : gap * index

    onMount(() => {
        heights.update((previous) => [...previous, { key, height }])
    })

    onDestroy(() => {
        heights.update((previous) => previous.filter((item) => item.key !== key))
    })
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
