<script lang="ts">
    import { FORM_SIZE_MAP } from '../../form/form-sizes'

    import Error from '../error/error.svelte'

    type Variant = 'primary' | 'error' | 'success' | 'warning' | 'gray' | 'highlight'

    export let variant: Variant = 'gray'
    export let label: string | undefined = undefined

    const VARIANT_MAP: Record<Variant, string> = {
        primary: 'bg-primary-200 text-primary-700 dark:text-primary-800',
        error: 'bg-error-200 text-error-700 dark:text-error-800',
        success: 'bg-success-200 text-success-700 dark:text-success-800',
        warning: 'bg-warning-200 text-warning-700 dark:text-warning-800',
        gray: 'bg-gray-200 text-gray-700 dark:text-gray-800',
        highlight: 'bg-highlight-200 text-highlight-700 dark:text-highlight-800',
    }
</script>

<div
    class="px-4 min-h-10 rounded flex items-center {VARIANT_MAP[variant]} {FORM_SIZE_MAP.default
        .content.paddingY}"
>
    {#if variant === 'error'}
        <Error label="{label}" dark>
            <slot />
        </Error>
    {:else}
        <p>
            {#if label}
                <span class="font-bold">{label}: </span>
            {/if}
            <slot />
        </p>
    {/if}
</div>
