<script lang="ts">
    import Indicator from './indicator.svelte'
    let count: number[] = []

    let timeout: NodeJS.Timeout

    const handleNavigationStart = () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => (count = [...count, 1]), 100)
    }

    const handleNavigationEnd = () => {
        clearTimeout(timeout)
    }

    if (typeof window !== 'undefined') {
        window.addEventListener('sveltekit:navigation-start', handleNavigationStart)
        window.addEventListener('sveltekit:navigation-end', handleNavigationEnd)
    }
</script>

{#each count as _}
    <Indicator />
{/each}
