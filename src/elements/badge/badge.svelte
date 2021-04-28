<script lang="ts">
    type Variant = 'primary' | 'gray' | 'error' | 'highlight' | 'warning' | 'success'
    type Size = 'default' | 'large'
    export let variant: Variant = 'gray'
    export let size: Size = 'default'
    export let dot = false

    $: containerClasses = size === 'large' ? 'px-3 py-0.5' : 'text-sm px-2.5 py-0.5'
    $: dotClasses = size === 'large' ? 'w-1.5 h-1.5' : 'w-1 h-1'

    type ColorValue = {
        container: string
        dot: string
    }

    const VARIANT_MAP: Record<Variant, ColorValue> = {
        primary: {
            container: 'bg-primary-200 text-primary-700',
            dot: 'bg-primary-300',
        },
        gray: {
            container: 'bg-gray-200 text-gray-700',
            dot: 'bg-gray-300',
        },
        error: {
            container: 'bg-error-200 text-error-700',
            dot: 'bg-error-300',
        },
        highlight: {
            container: 'bg-highlight-200 text-highlight-700',
            dot: 'bg-highlight-300',
        },
        warning: {
            container: 'bg-warning-200 text-warning-700',
            dot: 'bg-warning-300',
        },
        success: {
            container: 'bg-success-200 text-success-700',
            dot: 'bg-success-300',
        },
    }
</script>

<span
    class="rounded-full font-medium inline-flex items-baseline space-x-1.5 {VARIANT_MAP[variant]
        .container} {containerClasses}"
>
    {#if dot}
        <div
            class="transform -translate-y-0.5 -ml-0.5 rounded-full {VARIANT_MAP[variant]
                .dot} {dotClasses}"
        ></div>
    {/if}
    <span>
        <slot />
    </span>
</span>
