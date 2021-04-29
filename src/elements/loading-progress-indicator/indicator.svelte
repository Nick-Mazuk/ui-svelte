<script lang="ts">
    import { tweened } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing'
    import { onDestroy, onMount } from 'svelte'
    import { get } from 'svelte/store'

    const progress = tweened(0, {
        duration: 150,
        easing: cubicOut,
    })

    const opacity = tweened(0.5, {
        duration: 500,
        easing: cubicOut,
        delay: 500,
    })

    let interval: NodeJS.Timeout

    onMount(() => {
        interval = setInterval(() => {
            const currentProgress = get(progress)
            const remainingProgress = 100 - currentProgress
            progress.set(currentProgress + remainingProgress / 15)
        }, 333)
        progress.set(25)
    })

    onDestroy(() => {
        clearInterval(interval)
    })

    const handleNavigationEnd = () => {
        clearInterval(interval)
        progress.set(100)
        opacity.set(0)
    }
    if (typeof window !== 'undefined')
        window.addEventListener('sveltekit:navigation-end', handleNavigationEnd)
</script>

<div
    class="h-1 bg-primary fixed top-0"
    style="transform:translateZ(100000px);z-index:1000;width:{$progress}%;opacity:{$opacity}"
></div>
