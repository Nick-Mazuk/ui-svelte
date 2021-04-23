<script lang="ts">
    type Color = 'primary' | 'gray' | 'error' | 'highlight' | 'warning' | 'success'
    export let color: Color = 'gray'
    export let large = false
    export let dot = false

    $: containerClasses = large ? 'text-sm px-3 py-0.5' : 'text-xs px-2.5 py-0.5'
    $: dotClasses = large ? 'w-1.5 h-1.5' : 'w-1 h-1'

    type ColorValue = {
        container: string
        dot: string
    }

    const COLOR_MAP: Record<Color, ColorValue> = {
        primary: {
            container: 'bg-primary-50 text-primary-700',
            dot: 'bg-primary-300',
        },
        gray: {
            container: 'bg-gray-50 text-gray-700',
            dot: 'bg-gray-300',
        },
        error: {
            container: 'bg-error-50 text-error-700',
            dot: 'bg-error-300',
        },
        highlight: {
            container: 'bg-highlight-50 text-highlight-700',
            dot: 'bg-highlight-300',
        },
        warning: {
            container: 'bg-warning-50 text-warning-700',
            dot: 'bg-warning-300',
        },
        success: {
            container: 'bg-success-50 text-success-700',
            dot: 'bg-success-300',
        },
    }
</script>

<span
    class="rounded-full font-medium inline-flex items-baseline space-x-1.5 {COLOR_MAP[color]
        .container} {containerClasses}"
>
    {#if dot}
        <div
            class="transform -translate-y-0.5 -ml-0.5 rounded-full {COLOR_MAP[color]
                .dot} {dotClasses}"
        ></div>
    {/if}
    <span>
        <slot />
    </span>
</span>
