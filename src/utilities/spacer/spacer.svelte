<script lang="ts">
    export let y: number = 0
    export let x: number = 0

    const multiplier = 32

    const getWidth = () => {
        if (x) return x * multiplier
        if (y) return 0
        return multiplier
    }
    const getHeight = () => {
        if (y) return y * multiplier
        if (x) return 0
        return multiplier
    }

    $: height = getHeight()
    $: width = getWidth()
</script>

<div aria-hidden="true" style="{`height: ${height}px; width: ${width}px`}"></div>
