<script lang="ts">
    type Color = 'primary' | 'gray' | 'error' | 'highlight' | 'warning' | 'success'
    export let color: Color = 'gray'
    export let ping = false

    const COLOR_MAP: Record<Color, string> = {
        primary: 'bg-primary-400',
        gray: 'bg-gray-400',
        error: 'bg-error-400',
        highlight: 'bg-highlight-400',
        warning: 'bg-warning-400',
        success: 'bg-success-400',
    }

    $: dotClasses = `absolute w-2 h-2 rounded-full ${COLOR_MAP[color]}`
</script>

<div class="relative w-2 h-2">
    <div class="{dotClasses}"></div>
    {#if ping}
        <div class="{dotClasses} animate-ping"></div>
    {/if}
</div>
