<script lang="ts">
    type Color = 'primary' | 'secondary' | 'error' | 'highlight' | 'warning' | 'success'
    export let color: Color = 'secondary'
    export let large: boolean = false
    export let dot: boolean = false

    $: sizeClasses = large ? 'text-sm px-3 py-1' : 'text-xs px-3 py-1'
    $: withDotClasses = dot ? 'inline-flex items-center space-x-2' : ''

    type ColorValue = {
        container: string
        dot: string
    }

    const COLOR_MAP: Record<Color, ColorValue> = {
        primary: {
            container:
                'bg-primary-50 text-primary-700 border-primary-50 dark:bg-primary-d50 dark:text-primary-d700 dark:border-primary-d50',
            dot: 'bg-primary-300',
        },
        secondary: {
            container:
                'bg-gray-50 text-gray-700 border-gray-50 dark:bg-gray-d50 dark:text-gray-d700 dark:border-gray-d50',
            dot: 'bg-gray-300',
        },
        error: {
            container:
                'bg-error-50 text-error-700 border-error-50 dark:bg-error-d50 dark:text-error-d700 dark:border-error-d50',
            dot: 'bg-error-300',
        },
        highlight: {
            container:
                'bg-highlight-50 text-highlight-700 border-highlight-50 dark:bg-highlight-d50 dark:text-highlight-d700 dark:border-highlight-d50',
            dot: 'bg-highlight-300',
        },
        warning: {
            container:
                'bg-warning-50 text-warning-700 border-warning-50 dark:bg-warning-d50 dark:text-warning-d700 dark:border-warning-d50',
            dot: 'bg-warning-300',
        },
        success: {
            container:
                'bg-success-50 text-success-700 border-success-50 dark:bg-success-d50 dark:text-success-d700 dark:border-success-d50',
            dot: 'bg-success-300',
        },
    }
</script>

<span class="rounded-full font-medium {COLOR_MAP[color].container} {sizeClasses} {withDotClasses}">
    {#if dot}
        <div class="w-1.5 h-1.5 rounded-full {COLOR_MAP[color].dot}"></div>
    {/if}
    <span><slot /></span>
</span>
