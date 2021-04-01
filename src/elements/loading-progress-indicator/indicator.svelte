<script lang="ts">
    import { tweened } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing'
    import { onMount } from 'svelte'
    const progress = tweened(0, {
        duration: 150,
        easing: cubicOut,
    })

    const opacity = tweened(0.5, {
        duration: 500,
        easing: cubicOut,
        delay: 500,
    })

    onMount(() => {
        console.log('mount', $opacity)
        progress.set(66)
    })

    const handleNavigationEnd = () => {
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
