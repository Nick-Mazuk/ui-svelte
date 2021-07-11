<script lang="ts" context="module">
    type Heights = { key: number; height: number }[]
    let heights = writable<Heights>([])
    let counter = 0
</script>

<script lang="ts">
    import { onDestroy, onMount, tick } from 'svelte'
    import { writable } from 'svelte/store'
    import { ToastVariant, _ToastItem, _toasts } from '.'

    import { TRANSITION_SPEED_MAP } from '../../configs/transitions'
    import Button from '../../elements/button/button.svelte'

    export let index: number
    export let isGroupHovered: boolean
    export let item: _ToastItem

    const transitionSpeed = TRANSITION_SPEED_MAP.larger.default
    const transitionSpeedStyle = transitionSpeed / 1000
    const gap = 12
    const maxToasts = 3
    const key = counter++
    const duration = Math.min(10, Math.max(4, item.duration ?? 7))
    let isEntering = true
    let height = 0
    let destroyTimeout: NodeJS.Timeout | undefined

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

    const removeToast = () => {
        _toasts.update((previous) => previous.filter((toast) => toast.key !== item.key))
    }

    const handleCancelClick = () => {
        item.cancel?.onClick()
        removeToast()
    }

    const handleActionClick = () => {
        item.action?.onClick()
        removeToast()
    }

    onMount(async () => {
        heights.update((previous) => [...previous, { key, height }])
        await tick()
        isEntering = false
        destroyTimeout = setTimeout(removeToast, duration * 1000)
    })

    onDestroy(() => {
        heights.update((previous) => previous.filter((item) => item.key !== key))
        if (destroyTimeout) clearTimeout(destroyTimeout)
    })

    const VARIANT_MAP: Record<ToastVariant, string> = {
        default: 'border bg-background',
        error: 'bg-error text-background dark:text-foreground dark:border border-background',
        success: 'bg-success text-background dark:text-foreground dark:border border-background',
    }

    $: variantClasses = VARIANT_MAP[item.variant ?? 'default']
</script>

<div
    class="shadow-lg p-6 rounded-lg w-full max-w-screen absolute bottom-0 flex justify-between space-x-6 items-center {variantClasses}"
    class:pointer-events-none="{index > maxToasts - 1}"
    style="transform: translate3d(0, calc({translateY}px), -{translateZ}px) scale({scale}); opacity: {opacity}; transition: opacity {transitionSpeedStyle}s, transform {transitionSpeedStyle}s;"
    bind:offsetHeight="{height}"
>
    <p>{item.text}</p>
    {#if item.action || item.cancel}
        <div class="flex space-x-3 -m-3 flex-none">
            {#if item.cancel}
                <Button variant="secondary" size="small" on:click="{handleCancelClick}">
                    {item.cancel.text}
                </Button>
            {/if}
            {#if item.action}
                <Button size="small" on:click="{handleActionClick}">
                    {item.action.text}
                </Button>
            {/if}
        </div>
    {/if}
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
