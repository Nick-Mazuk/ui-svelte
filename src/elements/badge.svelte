<script lang='ts'>
    type Color = 'primary' | 'secondary' | 'error' | 'highlight' | 'warning' | 'success'
    export let color: Color = 'secondary'

    const COLOR_MAP: Record<Color, string> = {
        primary: 'bg-primary-50 text-primary-700 border-primary-50 dark:bg-primary-d50 dark:text-primary-d700 dark:border-primary-d50',
        secondary: 'bg-gray-50 text-gray-700 border-gray-50 dark:bg-gray-d50 dark:text-gray-d700 dark:border-gray-d50',
        error: 'bg-error-50 text-error-700 border-error-50 dark:bg-error-d50 dark:text-error-d700 dark:border-error-d50',
        highlight: 'bg-highlight-50 text-highlight-700 border-highlight-50 dark:bg-highlight-d50 dark:text-highlight-d700 dark:border-highlight-d50',
        warning: 'bg-warning-50 text-warning-700 border-warning-50 dark:bg-warning-d50 dark:text-warning-d700 dark:border-warning-d50',
        success: 'bg-success-50 text-success-700 border-success-50 dark:bg-success-d50 dark:text-success-d700 dark:border-success-d50',
    }
</script>

<span class={`rounded ${COLOR_MAP[color]} font-semibold text-xs px-2 py-1`}>
    <slot></slot>
</span>