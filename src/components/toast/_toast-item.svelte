<script lang="ts" context="module">
    type Heights = { key: number; height: number }[]
    let heights = writable<Heights>([])
    let counter = 0
</script>

<script lang="ts">
    import { onDestroy, onMount, tick } from 'svelte'
    import { writable } from 'svelte/store'

    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'

    export let index: number
    export let isGroupHovered: boolean

    const transitionSpeed = TRANSITION_SPEED_MAP.larger.default
    const transitionSpeedStyle = transitionSpeed / 1000
    const gap = 12
    const maxToasts = 3
    const key = counter++
    let isEntering = true
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
    let restingOffset = 0
    $: {
        if (index === 0) restingOffset = 0
        else if (!$heights.slice(-1)[0]) restingOffset = gap * index
        else restingOffset = $heights.slice(-1)[0].height - height + gap * index
    }
    let translateY: number
    $: {
        if (isEntering) translateY = 96
        else translateY = -1 * (isGroupHovered ? stackedOffset : restingOffset)
    }
    $: translateZ = index + 1
    let opacity: number
    $: {
        if (isEntering) opacity = 0
        else opacity = index > maxToasts - 1 ? 0 : 1
    }

    onMount(async () => {
        heights.update((previous) => [...previous, { key, height }])
        await tick()
        isEntering = false
    })

    onDestroy(() => {
        heights.update((previous) => previous.filter((item) => item.key !== key))
    })
</script>

<div
    class="bg-background shadow-lg p-6 rounded-lg w-full max-w-screen border absolute bottom-0"
    class:pointer-events-none="{index > maxToasts - 1}"
    style="transform: translate3d(0, calc({translateY}px), -{translateZ}px) scale({scale}); opacity: {opacity}; transition: opacity {transitionSpeedStyle}s, transform {transitionSpeedStyle}s;"
    bind:offsetHeight="{height}"
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
    }
</style>
